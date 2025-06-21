import type { RouteRecordRaw } from 'vue-router';

const authChildren: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('@/views/Test.vue'),
    meta: {
      permission: '',
    },
  },
  {
    path: '/setup',
    name: 'setup-main',
    meta: {
      permission: '',
    },
    children: [
      {
        path: '',
        name: 'setup',
        component: () => {},
        meta: {
          permission: '',
        },
      },
    ] as Array<RouteRecordRaw>,
  },
];

export default authChildren;
