import Api from '@/services/Api'

export default {
  login(credentials) {
    return Api().post('login', credentials)
  },
  register(info) {
    return Api().post('register', info)
  }
}
