export class Gasto {
    id: number = 0
    descripcion: string = ''
    monto: string | number = '1.00'
    tipo_gasto: TypeGasto = 'fijo'
    fecha: Date = new Date()
    recurrente: boolean = true
    id_proveedor: number | null = null
    created_at: string = ''
    updated_at: string = ''
    proveedor: string = ''
}

export type TypeGasto = 'fijo' | 'comun' | 'extraordinario'