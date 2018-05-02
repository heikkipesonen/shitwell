import axios from 'axios'

const BASE_URL = '//192.168.1.11:5000'

const api = axios.create({
  baseURL: BASE_URL
})

api.interceptors.request.use((config) => {
  return config
})

export default api
