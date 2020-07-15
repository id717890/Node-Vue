import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'
import store from '../store'

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
