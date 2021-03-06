import Vue from 'vue'
import Vuex from 'vuex'
// import dialog from './dialog'
// import loading from "./loading";
import auth from './auth'
import config from './config'
import news from './news'
import loading from './loading'
import image from './image'
import dialog from './dialog'
import socket from './socket'
import chat from './chat'
import album from './album'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    // store => {
    //   // store.subscribeAction((action, state) => {});
    // }
  ],
  modules: {
    auth,
    config,
    news,
    loading,
    image,
    dialog,
    socket,
    chat,
    album
  }
})
