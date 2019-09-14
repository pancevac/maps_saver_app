import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import config from "./config";

window.axios = require("axios")
window.axios.defaults.baseURL = config.baseUrl

if (store.getters['auth/isAuth']) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + store.getters['auth/getAccessToken']
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
