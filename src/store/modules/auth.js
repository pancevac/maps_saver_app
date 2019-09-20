import Auth from "../../plugins/auth"
import Vue from "vue"

Vue.use(Auth)

const auth = {

  namespaced: true,

  state: {
    user: null,
    token: Vue.auth.getToken(),
    status: ''
  },

  getters: {
    authUser: state => state.user,
    token: state => state.token,
    isAuth: state => !!state.user,
    authStatus: state => state.status
  },

  mutations: {

    authRequest: state => {
      state.status = "loading"
    },

    authSuccess: (state, token) => {
      state.status = "success"
      state.token = token
    },

    authError: state => {
      state.status = "error"
    },

    authLogout: state => {
      state.user = null
      state.token = null
    },

    /**
     * Set access token on store and in local storage.
     */
    setToken: (state, payload) => {
      state.token = payload.token         // Set in state
      Vue.auth.setToken(                  // Set in localstorage
          payload.token,
          payload.expires_in + Date.now()
      )
    },

    setUser: (state, user) => {
      state.user = user
    },

  },

  actions: {

    userRequest: ({commit}) => {
      return new Promise((resolve, reject) => {
        axios.get('/api/user')
            .then(response => {
              commit('setUser', response.data)
              resolve(response.data)
            })
            .catch(err => {
              reject(err)
            })
      })
    },

    authRequest: ({commit, dispatch}, {username, password}) => {
      return new Promise((resolve, reject) => {
        commit('authRequest')
        axios.post('/api/login', {username, password})
            .then(response => {
              const token = response.data.access_token
              axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
              commit('setToken', {token})
              commit('authSuccess', token)
              dispatch('userRequest').then(user => {
                resolve(user)
              })
            })
            .catch(err => {
              commit('authError')
              Vue.auth.destroyToken()
              reject(err)
            })
      })
    },

    authLogout: ({commit}) => {
      return new Promise((resolve) => {
        // remove user from store
        commit('authLogout')
        // remove token from local storage
        Vue.auth.destroyToken()
        // remove the axios default header
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    }
  }
}

export default auth