import api from './index'

export const authenticate = (payload) => {
  return api.post('/login', payload).then(({data}) => {
    return data
  })
}

export default {
  authenticate
}
