import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import config from "./config";

window.axios = require("axios")
window.axios.defaults.baseURL = config.baseUrl

Vue.config.productionTip = false

const token = store.getters['auth/token']
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

store.dispatch('auth/userRequest')
    .then(() => {
      initApp()
    })
    .catch(() => {
      initApp()
    })

/*store.watch(state => state.auth.user, user => {
  console.log(user)
})*/

function initApp() {
  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount('#app')
}
