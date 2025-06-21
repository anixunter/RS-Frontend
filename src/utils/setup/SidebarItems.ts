import type { SidebarItem } from '@/dtos/common/Sidebar';

export function useSidebarItems(): SidebarItem[] {
  return [
    {
      label: 'Dashboard',
      isVisible: true,
    },
    {
      label: 'Dashboard',
      icon: 'Home',
      to: '/',
      isVisible: true,
    },
    {
      label: 'Setup',
      isVisible: true,
    },
    {
      label: 'Setup',
      icon: 'Settings',
      to: '/setup',
      isVisible: true,
    },
  ];
}
