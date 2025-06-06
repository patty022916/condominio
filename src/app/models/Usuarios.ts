export class Usuario {
    id: number = 0;
    nombre: string = '';
    email: string = '';
    password: string = '';
    apellido: string = '';
    confirm_password: string;
    id_rol: number = 0
    telefono: string = ''
    cargo: Cargo[] = []
    piso: string = ""
    letra: string = ""
    id_apartamento: number | null = null

}
export class Cargo {
    id: string = ''
    key: string = ''
    name: string = ''
    view: boolean = false
    create: boolean = false
    update: boolean = false
    delete: boolean = false
}
export class Roles {
    id: number = 0
    nombre: string = ''
    permisos: Cargo[] = []
}

