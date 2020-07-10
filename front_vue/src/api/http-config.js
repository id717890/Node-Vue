import Vue from 'vue'
import axios from 'axios'
import config from '../init/config'
import NProgress from 'nprogress'
import store from '../store'
// import router from '../router'

const Axios = axios.create({
  baseURL: config.apiAddress,
  headers: {
    // Accept: 'application/json',
    // 'Content-Type': 'application/json',
    // 'X-Requested-With': 'XMLHttpRequest',
  }
})

Axios.interceptors.request.use(config => {
  NProgress.start()
  config.headers.Authorization = 'Bearer ' + Vue.auth.getToken()
  return config
})

Axios.interceptors.response.use(
  response => {
    NProgress.done()
    // store.dispatch('setLoading', false)
    return response
  },
  error => {
    console.log('AXIOS' + error)
    console.log(error)
    if (error.response.status === 401) {
      store.dispatch('logoutAndRedirectLogin')
      //     // store.dispatch('redirectToSignIn')
    }
    // if (error.response !== null && error.response !== undefined) {
    //   if (error.response.status === 403 || error.response.status === 401) {
    //     // store.dispatch('logout')
    //     // store.dispatch('redirectToSignIn')
    //   }
    // }
    NProgress.done()
    // // store.dispatch('setLoading', false)
    return Promise.reject(error.response)
  }
)

export default Axios
