import { Compra, Pago } from "../models/Pagos";

export const PAY_LIST: Pago[] = [
    {
        id: 1,
        id_apartamento: 1,
        apartamento: '7A',
        nombre_usuario: 'Francisco Santana',
        nombre_cuota: 'Cuota 1',
        id_usuario: 1,
        id_cuota: 1,
        monto: 7.0485,
        url: 1,
        status: 'pendiente',
        forma_pago: 'completo',
        fecha_pago: new Date()
    },
    {
        id: 2,
        id_apartamento: 2,
        apartamento: '3A',
        nombre_usuario: 'Carlos Gomez',
        nombre_cuota: 'Cuota 2',
        id_usuario: 2,
        id_cuota: 2,
        monto: 200,
        url: 2,
        status: 'pendiente',
        forma_pago: 'completo',
        fecha_pago: new Date()
    },
    {
        id: 4,
        id_apartamento: 3,
        apartamento: '3A',
        nombre_usuario: 'Patricia Gomez',
        nombre_cuota: 'Cuota 3',
        id_usuario: 3,
        id_cuota: 3,
        monto: 300,
        url: 3,
        status: 'pagado',
        forma_pago: 'parcial',
        fecha_pago: new Date()
    },
    {
        id: 4,
        id_apartamento: 3,
        apartamento: '7B',
        nombre_usuario: 'Patricia Gomez',
        nombre_cuota: 'Cuota 3',
        id_usuario: 3,
        id_cuota: 3,
        monto: 300,
        url: 3,
        status: 'pendiente',
        forma_pago: 'parcial',
        fecha_pago: new Date()
    },
    {
        id: 5,
        id_apartamento: 3,
        apartamento: '7A',
        nombre_usuario: 'Carlos Gomez',
        nombre_cuota: 'Cuota 3',
        id_usuario: 3,
        id_cuota: 3,
        monto: 300,
        url: 3,
        status: 'pagado',
        forma_pago: 'completo',
        fecha_pago: new Date()
    }
]


export const COMPRAS_LIST: Compra[] = [
    {
        id: 1,
        referencia: 123456,
        monto: 1000,
        fecha_compra: new Date(),
        servicio: 'antena',
        movimiento: 'ingreso',
        moneda: 'usd'
    },
    {
        id: 2,
        referencia: 789012,
        monto: 2000,
        fecha_compra: new Date(),
        servicio: 'divisas',
        movimiento: 'egreso',
        moneda: 'usd'
    },
    {
        id: 3,
        referencia: 345678,
        monto: 3000,
        fecha_compra: new Date(),
        servicio: 'antena',
        movimiento: 'egreso',
        moneda: 'usd'
    }
]
