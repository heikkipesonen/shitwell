import Vue from 'vue'
import Vuex from 'vuex'

import Login from './login'
import Devices from './devices'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Login,
    Devices
  },

  state: {},
  actions: {},
  mutations: {},
  getters: {}
})
