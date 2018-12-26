import Api from '@/services/Api'

export default {
  getReceivers(pagination) {
    return Api().get(`receivers?pagination=${JSON.stringify(pagination)}`)
  },
  createReceiver(info) {
    return Api().post('receivers', info)
  },
  updateReceiver(id, attributes) {
    return Api().post(`receivers/${id}`, attributes)
  },
  deleteReceiver(id) {
    return Api().delete(`receivers/${id}`)
  }
}
