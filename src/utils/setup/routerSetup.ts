import router from '@/router';
import { useAuth } from '@/stores/User/Auth';
import { useUser } from '@/stores/User/User';
import type { App } from 'vue';

const initRouter = (app: App) => {
  const useUserStore = useUser();
  const authStore = useAuth();
  router.beforeEach(async (to, _, next) => {
    if (!authStore.token) {
      const refreshed = await authStore.refreshToken();
      if (!refreshed) {
        if (to.name !== 'login') {
          return next({ name: 'login' });
        }
        return next();
      }
    }
    await useUserStore.fetchUserDetail();
    if (to.name == 'login') {
      if (useUserStore.isAuthenticated) {
        next({ name: 'dashboard' });
      } else {
        next();
      }
    } else {
      if (to.meta.requireAuth) {
        if (useUserStore.isAuthenticated) {
          next();
        } else {
          next({ name: 'login' });
        }
      } else {
        next();
      }
    }
  });
  app.use(router);
};

export default initRouter;
