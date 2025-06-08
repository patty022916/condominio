export class Pago {
    id: number = 0
    id_apartamento: number = 0
    apartamento: string = 'A2'
    nombre_usuario: string = 'Erik Rodriguez'
    nombre_cuota: string = ''
    id_usuario: number = 0
    id_cuota: number = 0
    monto: number = 0
    //por ahora url es referencia
    url: number = 0
    status: EstatusPago = 'pendiente'
    forma_pago: FormaPago = 'completo'
    fecha_pago: Date = new Date()


}

export type EstatusPago = 'pendiente' | 'pagado'
export type FormaPago = 'parcial' | 'completo'

export class Compra {
    id: number = 0
    referencia: number = 0
    monto: number = 0
    fecha_compra: Date = new Date()
    servicio: ServicioIngreso = 'antena'
    movimiento: Movimiento = 'ingreso'
    moneda: 'usd' | 'bs' = 'usd'
}

export type ServicioIngreso = 'antena' | 'internet' | 'divisas'
export type Movimiento = 'ingreso' | 'egreso'