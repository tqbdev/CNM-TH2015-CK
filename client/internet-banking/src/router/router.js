import Vue from 'vue';
import Router from 'vue-router';

import Login from '@/components/Login';
import Home from '@/components/Home/Home';
import Receiver from '@/components/Receiver/Receiver';
import Admin from '@/components/Admin/Admin';
import Transfer from '@/components/Transfer/Transfer';
import ConfirmTransaction from '@/components/Transfer/ConfirmTransaction';
import NotFound from '@/components/NotFound';
import store from '@/store/store';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '*',
      beforeEnter: (to, from, next) => {
        if (store.state.isUserLoggedIn) {
          if (store.state.user.isStaff) {
            next('/admin');
          } else {
            next('/home');
          }
        } else {
          next('/login');
        }
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/404',
      name: '404',
      component: NotFound
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      beforeEnter: (to, from, next) => {
        if (store.state.isUserLoggedIn) {
          if (store.state.user.isStaff) {
            next();
          } else {
            next('/home');
          }
        } else {
          next('/login');
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
            next('/admin');
          } else {
            next();
          }
        } else {
          next('/login');
        }
      }
    },
    {
      path: '/receivers',
      name: 'receivers',
      component: Receiver,
      beforeEnter: (to, from, next) => {
        if (store.state.isUserLoggedIn) {
          if (store.state.user.isStaff) {
            next('/admin');
          } else {
            next();
          }
        } else {
          next('/login');
        }
      }
    },
    {
      path: '/transfer/:senderAccountId',
      name: 'transfer',
      component: Transfer,
      beforeEnter: (to, from, next) => {
        if (store.state.isUserLoggedIn) {
          if (store.state.user.isStaff) {
            next('/admin');
          } else {
            next();
          }
        } else {
          next('/login');
        }
      }
    },
    {
      path: '/transfer',
      name: 'transfer',
      component: Transfer,
      beforeEnter: (to, from, next) => {
        if (store.state.isUserLoggedIn) {
          if (store.state.user.isStaff) {
            next('/admin');
          } else {
            next();
          }
        } else {
          next('/login');
        }
      }
    },
    {
      path: '/confirm-transaction/:transactionId',
      name: 'confirm-transaction',
      component: ConfirmTransaction,
      beforeEnter: (to, from, next) => {
        if (store.state.isUserLoggedIn) {
          if (store.state.user.isStaff) {
            next('/admin');
          } else {
            next();
          }
        } else {
          next('/login');
        }
      }
    }
  ]
});
