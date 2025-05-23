export class Gasto {
    id: number = 0
    descripcion: string = ''
    monto: string | number = ''
    tipo_gasto: TypeGasto = 'fijo'
    fecha: string = ''
    recurrente: string = ''
    id_proveedor: string = ''
    created_at: string = ''
    updated_at: string = ''
    proveedor: string = ''
}

export type TypeGasto = 'fijo' | 'comun' | 'extraordinario'