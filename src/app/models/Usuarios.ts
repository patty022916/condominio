export class Usuario {
    id: number = 0;
    nombre: string = '';
    email: string = '';
    password: string = '';
    confirm_password: string;
    id_rol: number = 0
    telefono: string = ''
    cargo: Cargo[] = []

}

export class Cargo {
    id: string = ''
    key: string = ''
    name: string = ''
    view: string = ''
    create: string = ''
    update: string = ''
    delete: string = ''
}

export class Roles {
    id: number = 0
    nombre: string = ''
    permisos: Cargo[] = []
}

