import Vue from 'vue'
import * as types from './mutation-types'
import context from '../api/api'
import router from '../router'

const state = {
  allAlbums: []
}

// getters
const getters = {
  getAlbumById: state => id => {
    return state.allAlbums.find(x => Number(x.id) === Number(id))
  }
}

// actions
const actions = {
  async getAllAlbums({ commit, dispatch }) {
    context
      .get('api/album')
      .then(x => {
        commit(types.GET_ALL_ALBUMS, x)
        dispatch('setLoading', false)
      })
      .catch(() => {
        dispatch('setLoading', false)
      })
  },
  async createAlbum({ dispatch }, payload) {
    await context.post('api/album', payload).then(x => {
      if (x.status && x.status !== 200) {
        if (x.data) {
          if (x.data.errors) {
            x.data.errors.forEach(error => Vue.noty.error(error.msg))
          }
          if (x.data.msg) Vue.noty.error(x.data.msg)
        }
      } else {
        dispatch('setLoading', false)
        router.push('/lk/albums')
      }
    })
  },
  async updateAlbum({ dispatch }, payload) {
    await context
      .post('api/album/update/' + payload.id, payload)
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
          router.push('/lk/albums')
        }
      })
      .catch(x => {
        console.log(x)
        dispatch('setLoading', false)
      })
  },
  async deleteAlbum({ dispatch }, payload) {
    context.post('api/album/delete/' + payload.id).then(() => {
      dispatch('getAllAlbums')
    })
  }
}

// mutations
const mutations = {
  [types.GET_ALL_ALBUMS](state, payload) {
    state.allAlbums = payload
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
