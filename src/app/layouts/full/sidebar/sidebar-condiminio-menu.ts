import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Analisis',
    key_module: 'statistics'

  },
  {
    displayName: 'Estadísticas',
    iconName: 'layout-grid-add',
    route: '/dashboard',
    key_module: 'statistics'
  },
  {
    navCap: 'Administración',
    key_module: 'administration'
  },
  {
    displayName: 'Apartamentos',
    iconName: 'home',
    route: '/apartamentos',
    key_module: 'administration'
  },
  {
    displayName: 'Residentes',
    key_module: 'administration',
    iconName: 'users',
    route: '',
    children: [
      {
        displayName: 'Inquilinos/Propietarios',
        iconName: 'user',
        route: '/propietarios-inquilinos',
        key_module: 'administration',
      },
      {
        displayName: 'Asignar Cargos',
        iconName: 'user-check',
        route: '/usuarios',
        key_module: 'administration',
      }
    ],
  },
  {
    displayName: 'Gastos',
    iconName: 'credit-card',
    route: '/gastos',
    key_module: 'administration'
  },
  {
    displayName: 'Cuotas',
    iconName: 'file-text',
    route: '/cuotas',
    key_module: 'administration'
  },
  {
    displayName: 'Notificaciones',
    iconName: 'bell',
    route: '/notificaciones',
    key_module: 'administration'
  },
  {
    displayName: 'Proveedores',
    iconName: 'truck',
    route: '/proveedores',
    key_module: 'administration'
  },
  {
    navCap: 'Finanzas Generales',
    key_module: 'general_finances'
  },
  {
    displayName: 'Atrasados',
    iconName: 'clock',
    route: '',
    key_module: 'general_finances'
  },
  {
    displayName: 'Pagos',
    iconName: 'wallet',
    route: '',
    key_module: 'general_finances'
  },
  {
    displayName: 'Divisas',
    iconName: 'globe',
    route: '',
    key_module: 'general_finances'
  },
  {
    navCap: 'Finanzas Personales',
    key_module: 'personal_finance'
  },
  {
    displayName: 'Pagos',
    iconName: 'wallet',
    route: '',
    key_module: 'personal_finance'
  },
  {
    displayName: 'Deudas',
    iconName: 'file-minus',
    route: '',
    key_module: 'personal_finance'
  },
  {
    navCap: 'Comunidad',
    key_module: 'community'
  },
  {
    displayName: 'Reportes',
    iconName: 'file-text',
    route: '',
    key_module: 'community'
  },

  // {
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
