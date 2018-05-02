import { getStatus, getData } from '@/api/meters'

const state = {
  data: {}
}

const actions = {
  getStatus ({commit}, deviceId) {
    return getStatus(deviceId).then((status) => {
      commit('setMeterStatus', {
        deviceId,
        status
      })

      return status
    })
  },

  getData ({commit}, {deviceId, start, end}) {
    return getData({
      deviceId,
      start,
      end
    }).then((data) => {
      commit('setMeterData', {
        deviceId,
        data
      })
      return data
    })
  }
}

const mutations = {
  setMeterStatus (state, {deviceId, status}) {
    state.data = {
      ...state.data,
      [deviceId]: {
        ...(state.data[deviceId] || {}),
        status
      }
    }
  },

  setMeterData (state, { deviceId, data }) {
    state.data = {
      ...state.data,
      [deviceId]: {
        ...(state.data[deviceId] || {}),
        data
      }
    }
  }
}

const getters = {

}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
