import Vue from 'vue'
import firebase from "firebase";
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

let app = '';

const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_DATA_BASE_URL,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_ID
};

firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount('#app')
  }
})
