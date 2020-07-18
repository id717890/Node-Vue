import Vue from 'vue'
import store from '../store'

export default (from, to, next) => {
  if (Vue.auth.isAdmin() === true) {
    next()
  } else {
    store.dispatch('logout')
    next('/login')
  }
}
