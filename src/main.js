// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Element from 'element-ui';
// noinspection JSFileReferences
import App from './App';
import router from './router';
import store from './store';
import './registerServiceWorker';
import { createProvider } from './vue-apollo';

require('sweetalert');

Vue.use(Element);
Vue.config.productionTip = false;

Vue.prototype.$eventHub = new Vue();

new Vue({
  router,
  store,
  apolloProvider: createProvider(),
  render: h => h(App),
}).$mount('#app');
