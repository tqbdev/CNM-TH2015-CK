import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/Login'
// import Home from '@/components/Home/Home'
// import store from '@/store/store'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '*',
      redirect: 'login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    // {
    //   path: '/home',
    //   name: 'home',
    //   component: Home,
    //   beforeEnter: (to, from, next) => {
    //     if (store.state.isUserLoggedIn) {
    //       next()
    //     } else {
    //       next('/login')
    //     }
    //   }
    // }
  ]
})
