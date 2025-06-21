import type { RouteLocationRaw } from 'vue-router';

export type SidebarItem = {
  label: string;
  to?: RouteLocationRaw;
  icon?: string;
  isVisible?: boolean;
  children?: {
    label: string;
    to: RouteLocationRaw;
    isVisible?: boolean;
  }[];
};
