import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
    {
        navCap: 'Analisis',
    },
    {
        displayName: 'Estadísticas',
        iconName: 'layout-grid-add',
        route: '/dashboard',
    },
    {
        navCap: 'Administración',
    },
    {
        displayName: 'Apartamentos',
        iconName: 'message-dots',
        route: '/apartamentos'
    },
    {
        displayName: 'Miembros',
        iconName: 'file-invoice',
        route: '',
        children: [
            {
                displayName: 'Inquilinos/Propietarios',
                iconName: 'point',
                route: '/propietarios-inquilinos',
            },
            {
                displayName: 'Asignar Cargos',
                iconName: 'point',
                route: '/usuarios',
            },
             {
                displayName: 'Transferencia de Cargo',
                iconName: 'point',
                route: '/',
            },

        ],
    },
    {
        displayName: 'Gastos',
        iconName: 'message-dots',
        route: '/gastos'
    },
    {
        displayName: 'Deudas',
        iconName: 'message-dots',
        route: ''
    },
    {
        displayName: 'Notificaciones',
        iconName: 'message-dots',
        route: ''
    },
    {
        displayName: 'Proveedores',
        iconName: 'message-dots',
        route: '/proveedores'
    },
    {
        navCap: 'Finanzas Generales',
    },
    {
        displayName: 'Atrasados',
        iconName: 'message-dots',
        route: ''
    },
    {
        displayName: 'Pagos',
        iconName: 'message-dots',
        route: '',
        external: false,
    },
    {
        displayName: 'Divisas',
        iconName: 'message-dots',
        route: '',
        external: false,
    },
    {
        navCap: 'Finanzas Personales',
    },
    {
        displayName: 'Pagos',
        iconName: 'message-dots',
        route: '',
        external: true,
    },
    {
        displayName: 'Deudas',
        iconName: 'message-dots',
        route: '',
        external: true,
    },
    {
        navCap: 'Comunidad',
    },
    {
        displayName: 'Reportes',
        iconName: 'message-dots',
        route: '',
        external: true,
    },
    //{
    //     navCap: 'Ui Components',
    // },
    // {
    //     displayName: 'Badge',
    //     iconName: 'archive',
    //     route: '/ui-components/badge',
    // },
    // {
    //     displayName: 'Chips',
    //     iconName: 'info-circle',
    //     route: '/ui-components/chips',
    // },
    // {
    //     displayName: 'Lists',
    //     iconName: 'list-details',
    //     route: '/ui-components/lists',
    // },
    // {
    //     displayName: 'Menu',
    //     iconName: 'file-text',
    //     route: '/ui-components/menu',
    // },
    // {
    //     displayName: 'Tooltips',
    //     iconName: 'file-text-ai',
    //     route: '/ui-components/tooltips',
    // },
    // {
    //     displayName: 'Forms',
    //     iconName: 'clipboard-text',
    //     route: '/ui-components/forms',
    // },
    // {
    //     displayName: 'Tables',
    //     iconName: 'table',
    //     route: '/ui-components/tables',
    // }
];
