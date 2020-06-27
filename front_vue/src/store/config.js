import * as types from './mutation-types'
import context from '../api/api'
// import Vue from 'vue'
// import router from '../router'

const state = {
  allConfigs: null
}

// getters
const getters = {
  getConfig: state => key => {
    if (!state.allConfigs) return null
    const find = state.allConfigs.find(x => x.key === key)
    if (!find) return null
    return find.value
  }
  // cfgColor: state => {
  //   if (!state.allConfigs) return null
  //   const find = state.allConfigs.find(x => x.key === 'color')
  //   if (!find) return null
  //   return find.value
  // },
  // cfgNavbar: state => {
  //   if (!state.allConfigs) return null
  //   const find = state.allConfigs.find(x => x.key === 'navbar')
  //   if (!find) return null
  //   return find.value
  // },
  // cfgTheme: state => {
  //   if (!state.allConfigs) return null
  //   const find = state.allConfigs.find(x => x.key === 'theme')
  //   if (!find) return null
  //   return find.value
  // }
}

// actions
const actions = {
  async getAllConfigs({ commit }) {
    context.get('api/config').then(x => commit(types.GET_ALL_CONFIGS, x))
  }
}

// mutations
const mutations = {
  [types.GET_ALL_CONFIGS](state, payload) {
    state.allConfigs = payload
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
