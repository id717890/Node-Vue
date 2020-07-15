import context from '../api/api'
import * as types from './mutation-types'
import router from '../router'
import Vue from 'vue'

const state = {
  allNews: []
}

// actions
const actions = {
  async updateNews({ dispatch }, payload) {
    await context
      .post('api/news/update/' + payload.id, payload)
      .then(x => {
        if (x.status && x.status !== 200) {
          if (x.data) {
            if (x.data.errors) {
              x.data.errors.forEach(error => Vue.noty.error(error.msg))
            }
            if (x.data.msg) Vue.noty.error(x.data.msg)
          }
        } else {
          dispatch('setLoading', false)
          router.push('/lk/news')
        }
      })
      .catch(x => {
        console.log(x)
        dispatch('setLoading', false)
      })
  },
  async createNews({ dispatch }, payload) {
    await context.post('api/news', payload).then(x => {
      if (x.status && x.status !== 200) {
        if (x.data) {
          if (x.data.errors) {
            x.data.errors.forEach(error => Vue.noty.error(error.msg))
          }
          if (x.data.msg) Vue.noty.error(x.data.msg)
        }
      } else {
        dispatch('setLoading', false)
        router.push('/lk/news')
      }
    })
  },
  async deleteNews({ dispatch }, payload) {
    context.post('api/news/delete/' + payload.id).then(() => {
      dispatch('getAllNews')
    })
  },
  async getAllNews({ commit }) {
    context.get('api/news').then(x => {
      commit(types.GET_ALL_NEWS, x)
    })
  },
  async getAllNewsAnonymous({ commit }) {
    context.get('api/news/all').then(x => {
      commit(types.GET_ALL_NEWS, x)
    })
  }
}

// mutations
const mutations = {
  [types.GET_ALL_NEWS](state, payload) {
    state.allNews = payload
  }
}

// getters
const getters = {
  getNewsById: state => id => {
    return state.allNews.find(x => Number(x.id) === Number(id))
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
