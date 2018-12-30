import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/dist/vuetify.min.css'
import 'vue-snotify/styles/material.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

import moment from 'moment'
import Vue from 'vue'
import App from './App.vue'
import router from '@/router/router'
import Vuetify from 'vuetify'
import Snotify, {
  SnotifyPosition
} from 'vue-snotify'
import {
  sync
} from 'vuex-router-sync'

import store from '@/store/store'

import Panel from '@/components/globals/Panel'

Vue.config.productionTip = false

const options = {
  toast: {
    position: SnotifyPosition.rightTop
  }
}

Vue.use(Vuetify)
Vue.use(Snotify, options)
Vue.component('panel', Panel)

Vue.filter('accountStatus', value => {
  if (value) {
    return 'OPEN'
  }
  return 'CLOSED'
})

Vue.filter('convertDateTime', value => {
  return moment(value).format('DD-MM-YYYY HH:MM');
})

sync(store, router)

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
