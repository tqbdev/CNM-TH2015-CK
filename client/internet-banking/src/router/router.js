import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/Login'
import Home from '@/components/Home'
import Accounts from '@/components/Accounts'
import Admin from '@/components/Admin/Admin'
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
      component: Admin,
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
      component: Home,
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
    },
    {
      path: '/accounts',
      name: 'accounts',
      component: Accounts,
      // beforeEnter: (to, from, next) => {
      //   if (store.state.isUserLoggedIn) {
      //     if (store.state.user.isStaff) {
      //       next('/admin')
      //     } else {
      //       next()
      //     }
      //   } else {
      //     next('/login')
      //   }
      // }
    }
  ]
})
