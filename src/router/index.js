import Vue from 'vue';
import Router from 'vue-router';
// noinspection NpmUsedModulesInstalled
import Auth from '@/components/Auth';
// noinspection NpmUsedModulesInstalled
import Main from '@/components/Main';

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
            name     : 'Main',
            component: Main,
        },
    ],
});
