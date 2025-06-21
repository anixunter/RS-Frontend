import { acceptHMRUpdate, defineStore } from 'pinia';

export const useSidebar = defineStore('sidebar', {
  state: () => ({
    sidebarOpen: true,
  }),

  getters: {
    isSidebarOpen(state) {
      return state.sidebarOpen;
    },
  },

  actions: {
    setSidebarStatus(value: boolean) {
      this.sidebarOpen = value;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSidebar, import.meta.hot));
}
