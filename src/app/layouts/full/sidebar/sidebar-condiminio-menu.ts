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
    iconName: 'home',
    route: '/apartamentos',
  },
  {
    displayName: 'Miembros',
    iconName: 'users',
    route: '',
    children: [
      {
        displayName: 'Inquilinos/Propietarios',
        iconName: 'user',
        route: '/propietarios-inquilinos',
      },
      {
        displayName: 'Asignar Cargos',
        iconName: 'user-check',
        route: '/usuarios',
      },
      {
        displayName: 'Transferencia de Cargo',
        iconName: 'repeat',
        route: '/',
      },
    ],
  },
  {
    displayName: 'Gastos',
    iconName: 'credit-card',
    route: '/gastos',
  },
  {
    displayName: 'Deudas',
    iconName: 'file-minus',
    route: '',
  },
  {
    displayName: 'Notificaciones',
    iconName: 'bell',
    route: '/notificaciones',
  },
  {
    displayName: 'Proveedores',
    iconName: 'truck',
    route: '/proveedores',
  },
  {
    navCap: 'Finanzas Generales',
  },
  {
    displayName: 'Atrasados',
    iconName: 'clock',
    route: '',
  },
  {
    displayName: 'Pagos',
    iconName: 'wallet',
    route: '',
    external: false,
  },
  {
    displayName: 'Divisas',
    iconName: 'globe',
    route: '',
    external: false,
  },
  {
    navCap: 'Finanzas Personales',
  },
  {
    displayName: 'Pagos',
    iconName: 'wallet',
    route: '',
    external: true,
  },
  {
    displayName: 'Deudas',
    iconName: 'file-minus',
    route: '',
    external: true,
  },
  {
    navCap: 'Comunidad',
  },
  {
    displayName: 'Reportes',
    iconName: 'file-text',
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
