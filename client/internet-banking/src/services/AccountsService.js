import Api from '@/services/Api';

export default {
  getAccounts(pagination) {
    return Api().get(`accounts?pagination=${JSON.stringify(pagination)}`);
  },
  createAccount(info) {
    return Api().post('accounts', info);
  },
  updateAccount(id, attributes) {
    return Api().patch(`accounts/${id}`, attributes);
  },
  getAccount(id) {
    return Api().get(`accounts/${id}`);
  }
};
