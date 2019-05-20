import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'AppAuth',
      component: () => import('@/components/AppAuth'),
    },
    {
      path: '/validate',
      beforeEnter: (to, from, next) => {
        if (store.getters["user/userLoaded"]) {
          return next();
        }
        console.warn('User is not loaded, redirecting to log in page...');
        return next('/');
      },
      name: 'Dashboard',
      component: () => import('@/components/AppDashboard'),
    },
    {
      path: '/action_log',
      name: 'ActionLog',
      component: () => import('@/components/ActionLog'),
    }
  ],
});
