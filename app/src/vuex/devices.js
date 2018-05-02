import { list, status, update } from '@/api/devices'

const state = {
  devices: [],
  device: {}
}

const actions = {
  list ({commit}) {
    return list().then((data) => commit('setDevices', data))
  },

  getStatus ({commit}, { deviceId }) {
    return status({ deviceId }).then((data) => commit('setStatus', data))
  },

  update ({commit}, payload) {
    commit('setDevice', payload)
    return update(payload)
  }
}

const mutations = {
  setDevices (state, payload) {
    state.devices = payload
  },

  setStatus (state, payload) {
    state.device = payload.device
    state.device.meter = payload.status
  },

  setDevice (state, payload) {
    state.device = {
      ...state.device,
      ...payload,
      meter: {
        ...state.device.meter,
        ...(payload.meter || {})
      }
    }
  }
}

const getters = {
  devices (list) {
    return state.devices
  },

  status () {
    return state.device
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
