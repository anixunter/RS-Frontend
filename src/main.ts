import './assets/css/main.css'

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import initRouter from './utils/setup/routerSetup';

interface AppConfig {
  API_URL: string;
  APP_ENVIRONMENT: 'PRODUCTION' | 'DEVELOPMENT';
  CLIENT_NAME: string;
  CLIENT_LOGO: string;
  CLIENT_PAGE_TITLE: string;
  CLIENT_PAGE_TITLE_LOGO: string;
}

declare global {
  interface Window {
    APP_CONFIG: AppConfig;
  }
}

export const initAPP = () => {
  const app = createApp(App);
  app.use(createPinia());

  initRouter(app);

  app.mount('#app');
};
