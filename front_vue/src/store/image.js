import context from '../api/api'

const state = {}

// actions
const actions = {
  //eslint-disable-next-line
  async uploadImage({}, payload) {
    return await context.post('api/image/upload', payload)
  }
}

// mutations
const mutations = {}

// getters
const getters = {}

export default {
  state,
  getters,
  actions,
  mutations
}
