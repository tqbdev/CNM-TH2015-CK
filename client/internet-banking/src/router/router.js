import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/Login'
// import Home from '@/components/Home/Home'
import store from '@/store/store'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '*',
      beforeEnter: (to, from, next) => {
        if (store.state.isUserLoggedIn) {
          if (store.state.user.isStaff) {
            next('/admin')
          } else {
            next('/home')
          }
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/admin',
      name: 'admin',
      component: Login,
      beforeEnter: (to, from, next) => {
        if (store.state.isUserLoggedIn) {
          if (store.state.user.isStaff) {
            next()
          } else {
            next('/home')
          }
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/home',
      name: 'home',
      component: Login,
      beforeEnter: (to, from, next) => {
        if (store.state.isUserLoggedIn) {
          if (store.state.user.isStaff) {
            next('/admin')
          } else {
            next()
          }
        } else {
          next('/login')
        }
      }
    }
  ]
})
