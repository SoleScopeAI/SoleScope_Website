export interface NavItem {
  title: string;
  path: string;
  description?: string;
  children?: NavItem[];
  external?: boolean;
  icon?: React.ComponentType<any>;
}

export interface NavigationData {
  primary: NavItem[];
  secondary: NavItem[];
}