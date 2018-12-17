import axios from 'axios'
import store from '@/store/store'

function getAccessToken() {
  return axios.post('http://localhost:8081/token', {
    telephone: store.state.user.telephone,
    refreshToken: store.state.refreshToken
  }).then(response => {
    store.dispatch('setAccessToken', response.data.token)
    return response.data.token
  })
}

export default () => {
  const instance = axios.create({
    baseURL: `http://localhost:8081/`,
    headers: {
      Authorization: `Bearer ${store.state.accessToken}`
    }
  })

  instance.interceptors.response.use(function (response) {
    return response
  }, async function (error) {
    const originalRequest = error.config
    const shouldRefresh = store.state.accessToken !== null &&
      store.state.refreshToken !== null &&
      (error.response.status === 401 || error.response.status === 403) &&
      !originalRequest._retry

    if (shouldRefresh) {
      try {
        const token = await getAccessToken()
        originalRequest._retry = true
        originalRequest.headers.Authorization = `Bearer ${token}`
        return axios.request(originalRequest)
      } catch (err) {
        return Promise.reject(error)
      }
    }

    return Promise.reject(error)
  })

  return instance
}
