export type Role = {
  id: number;
  name: string;
  description?: string;
  permissions: Permission[];
};

export type Permission = {
  id: number;
  display_name: string;
};

export type PermissionCategory = {
  name: string;
  permissions: Permission[];
};
