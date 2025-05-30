export class NotificationUser {
    id: number = 0
    titulo: string = ''
    mensaje: string = ''
    tipo: TypeNotification = 'general'
    id_usuario: number = 0
    nombre: string = ''
    leida_at: Date | null = null
    created_at: string = ''
    piso: string = ''
    letra: string = ''


}

export type TypeNotification = 'cobro' | 'reunion' | 'alerta' | 'general'