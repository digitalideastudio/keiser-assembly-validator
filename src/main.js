// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Element from 'element-ui';
import App from './App';
import router from './router';
import store from './store';

require('sweetalert');

Vue.use(Element);
Vue.config.productionTip = false;

Vue.prototype.$eventHub = new Vue();
/* eslint-disable no-new */
new Vue({
    el        : '#app',
    router,
    store,
    template  : '<App/>',
    components: { App },
});
