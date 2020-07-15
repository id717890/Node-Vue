import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueJsModal from 'vue-js-modal'
import VueNoty from 'vuejs-noty-2'
import 'vuejs-noty-2/dist/vuejs-noty.css'
import AxiosConfig from './api/http-config'
import Auth from './plugins/auth'
import 'nprogress/nprogress.css'
import './plugins/font-awesome'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueSocketIO from 'vue-socket.io'

import '@fortawesome/fontawesome-free/css/all.css'
import './assets/scss/_app.scss'

Vue.$http = AxiosConfig
Vue.use(VueNoty)
Vue.use(Auth)
Vue.use(VueJsModal, { dynamic: true })
Vue.config.productionTip = false
Vue.component('fai', FontAwesomeIcon)
Vue.use(
  new VueSocketIO({
    debug: false,
    connection: 'http://localhost:3333',
    vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
    }
  })
)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  async created() {
    this.$store.dispatch('autoLogin')
  }
}).$mount('#app')
