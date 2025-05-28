export class NotificationUser {
    id: number = 0
    titulo: string = ''
    mensaje: string = ''
    tipo: TypeNotification = 'general'
    id_usuario: number = 0
    leida_at: Date | null = null

    
}

export type TypeNotification = 'cobro' | 'reunion' | 'alerta' | 'general'