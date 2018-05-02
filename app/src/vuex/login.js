import { authenticate } from '@/api/auth'

const state = {
  authorized: false,
  user: false
}

const actions = {
  login ({commit}, payload) {
    return authenticate(payload).then((login) => {
      commit('login', login)
    }, () => {
      commit('login', false)
    })
  }
}

const mutations = {
  login (state, payload) {
    const { id, ...user } = payload
    state.authorized = id
    state.user = user
  }
}

const getters = {
  login (state) {
    return !!state.authorized
  },

  devices (state) {
    return state.user && state.user.devices
  },

  user (state) {
    return state.user && state.user.name
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
