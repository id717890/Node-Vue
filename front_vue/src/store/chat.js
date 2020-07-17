import * as types from './mutation-types'
import context from '../api/api'

const state = {
  allChats: null
}

// getters
const getters = {}

// actions
const actions = {
  async getAllChats({ commit }) {
    context.get('api/chat').then(x => commit(types.GET_ALL_CHATS, x))
  }
}

// mutations
const mutations = {
  [types.GET_ALL_CHATS](state, payload) {
    state.allChats = payload
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
