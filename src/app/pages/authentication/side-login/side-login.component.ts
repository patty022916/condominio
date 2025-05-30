import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LoadingComponent } from 'src/app/components-form/loading/loading.component';
import { MaterialModule } from 'src/app/material.module';
import { ToastService } from 'src/app/services/toast.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-side-login',
  imports: [
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingComponent
  ],
  templateUrl: './side-login.component.html',
})
export class AppSideLoginComponent {
  loading: boolean = false
  hide: boolean = true
  remember_password: boolean = false
  login: { email: string, password: string } = { email: '', password: '' }

  constructor(
    private router: Router,
    private usersService: UsuariosService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    const remember = JSON.parse(localStorage.getItem('remember') as string);

    if (remember?.email) {
      this.remember_password = (remember.email);
      this.login.email = remember.email;
      this.login.password = remember.password;
    }

  }
  submit() {
    this.loading = true
    this.usersService.authentication(this.login).subscribe({
      next: (usuario) => {

        if ('original' in usuario) {
          this.loading = false
          return this.toastService.show(usuario.original.error)
        }
        this.loading = false
        sessionStorage.setItem('user', JSON.stringify(usuario))
        sessionStorage.setItem('is_logged', "true")

        //recordar contraseña
        if (this.remember_password) {
          localStorage.setItem('remember', JSON.stringify(this.login))
        } else {
          localStorage.removeItem('remember')
        }
        this.router.navigate(['dashboard'])
      },
      error: (err) => {
        this.loading = false
        this.toastService.show(err.error.error)
      },
    })
  }


}
