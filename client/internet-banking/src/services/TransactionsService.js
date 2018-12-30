import Api from '@/services/Api';

export default {
  getTransactions(pagination) {
    return Api().get(`transactions?pagination=${JSON.stringify(pagination)}`);
  },
  createTransaction(info) {
    return Api().post('transactions', info);
  },
  updateTransaction(id, attributes) {
    return Api().patch(`transactions/${id}`, attributes);
  },
  getTransaction(id) {
    return Api().get(`transactions/${id}`);
  }
};
