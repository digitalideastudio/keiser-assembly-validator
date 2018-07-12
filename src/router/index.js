import Vue from 'vue';
import Router from 'vue-router';
// noinspection NpmUsedModulesInstalled
import Auth from '@/components/Auth';
// noinspection NpmUsedModulesInstalled
import Dashboard from '@/components/Dashboard';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path     : '/',
            name     : 'Auth',
            component: Auth,
        },
        {
            path     : '/validate',
            name     : 'Dashboard',
            component: Dashboard,
        },
    ],
});
