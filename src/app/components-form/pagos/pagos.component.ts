import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from "../../layouts/full/header/header.component";
import { ButtonsHeaderComponent } from "../buttons-header/buttons-header.component";
import { LoadingComponent } from "../loading/loading.component";
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormaPago, Pago } from 'src/app/models/Pagos';
import { CuotasService } from 'src/app/services/cuotas.service';
import { Cuota } from 'src/app/models/Cuota';
import { ToastService } from 'src/app/services/toast.service';
import { Usuario } from 'src/app/models/Usuarios';
import { MatSelectChange } from '@angular/material/select';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PagosService } from 'src/app/services/pagos.service';
import { of } from 'rxjs';
import { environment } from 'src/app/environment/environment';

@Component({
  selector: 'app-pagos',
  imports: [
    ButtonsHeaderComponent,
    LoadingComponent,
    MaterialModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './pagos.component.html',
  styleUrl: './pagos.component.scss'
})
export class PagosComponent {
  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
  @ViewChild('captureTemplate') captureTemplate!: TemplateRef<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator

  host_storage: string = environment.host_storage
  //Compos de la imagen
  selectedFile: File | null = null;
  preview: string | ArrayBuffer | null = null;

  loading: boolean = false;
  mode_component: 'general' | 'personal' = 'general';


  pago: Pago = new Pago()
  usuario: Usuario = new Usuario()
  pagos: Pago[] = []

  dataSource = new MatTableDataSource<Pago>(this.pagos);
  dialogRef: MatDialogRef<any>;
  captureTemplateRef: MatDialogRef<any>;

  forma_pago: { key: FormaPago, nombre: string }[] = [
    { key: 'completo', nombre: 'Completo' },
    { key: 'parcial', nombre: 'Parcial' }
  ]

  cuota: Cuota = new Cuota()

  columnas: string[] = [
    'nombre',
    'apartamento',
    'forma_pago',
    'monto',
    'url',
    'referencia',
    'status',
    'created_at',
  ];

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private cuotasService: CuotasService,
    private toastService: ToastService,
    private pagosService: PagosService
  ) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    //capturamos de donde se esta llamando al componente
    this.mode_component = this.route.snapshot.data['tipo'];
    this.usuario = JSON.parse(sessionStorage.getItem('user') as string);

    if (this.mode_component == 'personal')
      this.generarCuotaPorUsuario(this.usuario.id)

    this.listarPagos(this.usuario.id)
  }

  listarPagos(usuario_id: number | null = null) {
    this.loading = true
    this.pagosService.listPayments(usuario_id as number).subscribe({
      next: (pagos) => {
        this.dataSource.data = pagos
        this.loading = false
      },
      error: (err) => {
        this.loading = false
        this.toastService.show(err.error.error);
      }
    })
  }
  /**
   * Genera una cuota por usuario según el apartamento 
   *
   * @param {number} id_user
   * @memberof PagosComponent
   */
  generarCuotaPorUsuario(id_user: number) {
    this.loading = true
    this.cuotasService.generarCuotaPorUsuario(id_user).subscribe({
      next: (cuota) => {
        //? evalúa  solo el primer indice del arreglo

        this.cuota = cuota
        this.refrescarPago()
        this.loading = false

      },
      error: (err) => {
        this.loading = false
        this.toastService.show(err.error.error);
      }
    })
  }

  openModal(elemet?: any) {
    this.dialogRef = this.dialog.open(this.dialogTemplate);
  }

  refrescarPago() {
    this.pago = new Pago()
    this.pago.monto = this.pago.forma_pago == 'completo' ? this.cuota.cuotas[0].total_bs : this.pago.monto
  }

  /**
   *Valida que el pago ea completo y que lo asigne al monto total del pago prevee mandar un pago completo con un monto
   *diferente
   *
   * @param {MatSelectChange} event
   * @memberof PagosComponent
   */
  validarPagoCompleto(event: MatSelectChange) {
    this.pago.monto = event.value == 'completo' ? this.cuota.cuotas[0].total_bs : this.pago.monto

  }

  guardar() {
    //agregamos el form data
    const formData = new FormData();
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    //todo ojo solo aplica para los usuarios propietarios o inquilino, para condominio id_apartamento es null
    //*extraemos datos de la cuota y usuarios
    let { id: id_usuario, id_apartamento } = this.usuario as unknown as Pago
    let { id: id_cuota } = this.cuota


    this.pago = { ...this.pago, id_usuario, id_apartamento, id_cuota }

    formData.append('pago_usuario', JSON.stringify(this.pago));
    this.loading = true


    //!ESTE PAGO ES SOLO PARA USUARIOS, RECORDAR ADAPTAR UNO PARA CONDOMINIOS
    this.pagosService.createUserPayment(formData).subscribe({
      next: (pago) => {

        this.dataSource.data = [pago.pago_usuario, ...this.dataSource.data];
        this.loading = false
        this.toastService.show('Pago registrado exitosamente')
        this.dialogRef.close()

      },
      error: (err) => {
        this.loading = false
        this.toastService.show(err.error.error);
      }
    })
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.preview = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  validarPagoMaximo() {

    let { total_bs } = this.cuota.cuotas[0]

    if (this.pago.monto > total_bs) {
      this.pago.monto = 0
      this.toastService.show('El monto es mayor al total de la cuota')
    }
  }

  viewCapture(capture: Pago) {
    this.captureTemplateRef = this.dialog.open(this.captureTemplate, { data: capture });
  }
}
