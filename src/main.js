import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
axios.defaults.baseURL = (process.env.NODE_ENV === 'production' ? '' : '/capi')
Vue.prototype.axios = axios
Vue.config.productionTip = false

import VueQriously from 'vue-qriously'
Vue.use(VueQriously)

import 'element-ui/lib/theme-chalk/index.css'
import {Message} from 'element-ui'
Vue.prototype.$message = Message;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
