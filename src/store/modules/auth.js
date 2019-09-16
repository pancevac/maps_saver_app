import Auth from "../../plugins/auth"
import Vue from "vue"

Vue.use(Auth)

const auth = {

  namespaced: true,

  state: {
    user: null,
    access_token: null,
    is_auth: false,
  },

  getters: {
    /**
     * Get auth user.
     */
    getUser: state => {
      return state.user
    },

    /**
     * Get access token
     */
    getAccessToken: state => {
      return state.access_token
    },

    /**
     * Check if user is authenticated.
     */
    isAuth: state => {
      return state.is_auth
    },
  },

  mutations: {

    /**
     * Set auth user.
     */
    setUser: (state, user) => {
      state.user = user
      state.is_auth = true
    },

    /**
     * Set access token on store and in local storage.
     */
    setAccessToken: (state, payload) => {
      state.access_token = payload.token // Set state
      Vue.auth.setToken(                 // Set localstorage
          payload.token,
          payload.expires_in + Date.now()
      )
    },

    /**
     * Destroy access token from store and local storage.
     */
    destroyAccessToken: state => {
      Vue.auth.destroyToken()
      state.access_token = null
      state.is_auth = false
      state.user = null
    }

  },

  actions: {

    setUser: (context, user) => {
      context.commit('setUser', user)
    },

    setAccessToken: (context, payload) => {
      context.commit('setAccessToken', payload)
    },

    destroyAccessToken: context => {
      context.commit('destroyAccessToken')
    },

    singOut: context => {
      context.commit('destroyAccessToken')
    }
  }
}

export default auth