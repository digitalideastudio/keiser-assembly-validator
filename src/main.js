// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en';
// noinspection JSFileReferences
import App from './App';
import router from './router';
import store from './store';
import './registerServiceWorker';
import apolloProvider from './apolloProvider';

require('sweetalert');

Vue.use(ElementUI, { locale });
Vue.config.productionTip = false;

Vue.prototype.$eventHub = new Vue();

new Vue({
  router,
  store,
  apolloProvider,
  render: h => h(App)
}).$mount('#app');
