// import * as types from './mutation-types'

const state = {}

// getters
const getters = {}

// actions
const actions = {
  SOCKET_NEW_MESSAGE(context, data) {
    console.log(context)
    console.log('MESSAGE RECIEVED', data)
  }
}

// mutations
const mutations = {}

export default {
  state,
  getters,
  actions,
  mutations
}
