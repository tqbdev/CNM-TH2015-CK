import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    accessToken: null,
    user: null,
    refreshToken: null,
    isUserLoggedIn: false
  },
  mutations: {
    setAccessToken (state, token) {
      state.accessToken = token

      if (token) {
        state.isUserLoggedIn = true
      } else {
        state.isUserLoggedIn = false
      }
    },

    setRefreshToken (state, token) {
      state.refreshToken = token

      if (token) {
        state.isUserLoggedIn = true
      } else {
        state.isUserLoggedIn = false
      }
    },

    setUser (state, user) {
      state.user = user
    },

    logout (state) {
      state.refreshToken = null;
      state.accessToken = null;
      state.user = null;
      state.isUserLoggedIn = null;
    }
  },
  actions: {
    setAccessToken ({commit}, token) {
      commit('setAccessToken', token)
    },

    setRefreshToken ({commit}, token) {
      commit('setRefreshToken', token)
    },

    setUser ({commit}, user) {
      commit('setUser', user)
    },

    logout ({commit}) {
      commit('logout')
    }
  },
  plugins: [
    createPersistedState()
  ]
})
