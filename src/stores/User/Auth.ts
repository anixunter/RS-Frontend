import { authAPI } from '@/core/endpoints/auth';
import api from '@/core/services/api';
import type { LoginPayload } from '@/dtos/User/auth';
import router from '@/router';
import { acceptHMRUpdate, defineStore } from 'pinia';
import { useUser } from './User';
import { Toast } from 'dolphin-components';

export const useAuth = defineStore('auth', {
  state: () => ({
    loginDetails: {
      username: '',
      password: '',
    } as LoginPayload,
    token: null as null | string,
    loginError: false,
  }),

  getters: {
    getLoginDetail(state) {
      return state.loginDetails;
    },
    getLoginError(state) {
      return state.loginError;
    },
  },

  actions: {
    async csrfGenerate() {
      try {
        await api.get(authAPI.csrfGenerate);
      } catch (error) {
        console.log(error);
      }
    },
    async login() {
      try {
        const response = await api.post(authAPI.login, this.loginDetails);
        this.token = response.data.data.access;
        Toast.success('Logged in successfully.');
        router.push({ name: 'dashboard' });
      } catch (error) {
        Toast.error('Unable to login!');
        this.hasLoginError();
      }
    },
    async logout() {
      const userStore = useUser();
      try {
        await api.post(authAPI.logout);
        userStore.$reset();
        this.loginDetails.username = '';
        this.loginDetails.password = '';
        this.token = null;
        Toast.success('Logged out successfully.');
        router.push({ name: 'login' });
      } catch (error) {
        console.log(error);
      }
    },
    async refreshToken() {
      try {
        const response = await api.post(authAPI.refresh);
        if (response.data) {
          this.token = response.data.data.access;
        }
        return true;
      } catch {
        return false;
      }
    },
    hasLoginError(status: boolean = true) {
      if (status) {
        this.loginError = true;
        setTimeout(() => {
          this.loginError = false;
        }, 5000);
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuth, import.meta.hot));
}
