import 'vue-router';

export {};

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean;
    permission?: string | undefined | null | Array<string>;
  }
}
