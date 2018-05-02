import api from './index'
import moment from 'moment'

export const list = () => api.get('/devices').then(({data}) => data)

export const getData = ({ deviceId, start, end }) => api.get(`/entries/${deviceId}`, {
  params: {
    start: moment(start).toISOString(),
    end: moment(end).toISOString()
  }
}).then(({data}) => data)

export const status = ({ deviceId }) => api.get(`/devices/${deviceId}`).then(({data}) => data)

export const update = ({ id, name, maxLevel, minLevel }) => api.post(`/devices/${id}/update`, { name, maxLevel, minLevel }).then(({data}) => data)
