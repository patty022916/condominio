export interface NavItem {
    displayName?: string;
    iconName?: string;
    navCap?: string;
    route?: string;
    children?: NavItem[];
    chip?: boolean;
    chipContent?: string;
    chipClass?: string;
    external?: boolean;
    view?: boolean;
    key_module?: KeyModule;
}

export type KeyModule =
    'statistics' |
    'administration' |
    'general_finances' |
    'personal_finance' |
    'community' 