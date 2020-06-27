import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import VueNoty from 'vuejs-noty-2'
import 'vuejs-noty-2/dist/vuejs-noty.css'
import AxiosConfig from './api/http-config'
import Auth from './plugins/auth'

Vue.$http = AxiosConfig
Vue.use(VueNoty)
Vue.use(Auth)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
