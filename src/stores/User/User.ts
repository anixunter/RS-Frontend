import { authAPI } from '@/core/endpoints/auth';
import api from '@/core/services/api';
import type { UserDetail } from '@/dtos/User/user';
import { Toast } from 'dolphin-components';
import { acceptHMRUpdate, defineStore } from 'pinia';

export const useUser = defineStore('user', {
  state: () => ({
    isAuthenticated: false,
    user: {} as UserDetail,
  }),
  getters: {
    getUser(state) {
      return state.user;
    },
  },
  actions: {
    async fetchUserDetail() {
      try {
        const response = await api.get(authAPI.self);
        this.user = response.data.data;
        this.isAuthenticated = true;
      } catch (error: any) {
        console.log(error);
        if (error.response.status == 403) {
          Toast.error('You do not have the permissions to perform this action.');
        } else {
          Toast.error('Login failed!');
        }
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUser, import.meta.hot));
}
