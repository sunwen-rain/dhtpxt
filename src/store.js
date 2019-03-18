import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accesstoken: {}
  },
  getters: {
    accesstoken (state) {
      return state.accesstoken
    }
  },
  mutations: {
    initToken (state, token) {
      state.accesstoken = token
    }
  },
  actions: {

  }
})
