export class Cuota {
    id: number = 0;
    fecha: Date = new Date()
    gasto_fijo: number = 0
    gasto_comun: number = 0
    gasto_extraordinario: number = 0
    gasto_total: number = 0
    cuotas: CuotaDetail[] = []
}

export class CuotaDetail {
    apartamento_id: number
    coef_alicuota: number
    cuota_fija_usd: number
    cuota_extraordinaria_usd: number
    total_bs: number
}