// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import qs from 'qs';
Vue.prototype.router = router;
Vue.prototype.$qs = qs;


Vue.use(ElementUI)

Vue.prototype.$axios=axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

/* eslint-disable no-new */
// document.addEventListener('deviceready', function() {
//     new Vue({
//         el: '#app',
//         router,
//         // store,
//         template: '<App/>',
//         components: { App }
//     })
    // window.navigator.splashscreen.hide()
// }, false);
