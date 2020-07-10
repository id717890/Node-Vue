import context from '../api/api'
import * as types from './mutation-types'
import router from '../router'

const state = {
  allNews: []
}

// actions
const actions = {
  async updateNews({ dispatch }, payload) {
    await context
      .post('api/news/update/' + payload.id, payload)
      .then(() => {
        dispatch('setLoading', false)
        router.push('/lk/news')
      })
      .catch(x => {
        console.log(x)
        dispatch('setLoading', false)
      })
  },
  async createNews({ dispatch }, payload) {
    await context.post('api/news', payload).then(() => {
      dispatch('setLoading', false)
      router.push('/lk/news')
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
