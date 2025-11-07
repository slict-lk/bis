interface User {
  id: string;
  tenantId: string;
  email?: string;
  name?: string;
  role?: string;
}

interface Tenant {
  id: string;
  name: string;
  settings: {
    theme?: string;
    borderRadius?: number;
    compactMode?: boolean;
    glassmorphism?: boolean;
    headerBlur?: number;
  };
}

interface AppearanceSettings {
  theme: string;
  primaryColor: string;
  borderRadius: number;
  compactMode: boolean;
  glassmorphism: boolean;
  headerBlur: number;
}
