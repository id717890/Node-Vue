import * as types from './mutation-types'

const state = {
  defaultDialog: false,
  congratulationDialog: false,
  messages: [],
  confirmDialogResult: false,
  copyDialogResult: null,
  deliveryDialogResult: null
}

// getters
const getters = {
  getConfirmDialogResult: state => state.confirmDialogResult
}

// actions
const actions = {
  setDeliveryDialog({ commit }, payload) {
    commit(types.SET_RESULT_DELIVERY_DIALOG, payload)
  },
  acceptConfirmDialog({ commit }) {
    commit(types.SET_RESULT_CONFIRM_DIALOG, true)
  },
  setCopyDialogResult({ commit }, payload) {
    commit(types.SET_RESULT_COPY_DIALOG, payload)
  },
  resetConfirmDialogResult({ commit }) {
    commit(types.SET_RESULT_CONFIRM_DIALOG, false)
  },
  resetCopyDialogResult({ commit }) {
    commit(types.SET_RESULT_COPY_DIALOG, null)
  },
  setMessageDialog({ commit }, payload) {
    commit(types.SET_MESSAGE_DIALOG, payload)
  },
  clearMessageDialog({ commit }) {
    commit(types.CLEAR_MESSAGE_DIALOG)
  },
  showCongratulationDialog({ commit }, payload) {
    commit(types.SHOW_CONGRATULATION_DIALOG, payload)
  }
}

// mutations
const mutations = {
  [types.SET_RESULT_DELIVERY_DIALOG](state, payload) {
    state.deliveryDialogResult = payload
  },
  [types.SET_RESULT_COPY_DIALOG](state, payload) {
    state.copyDialogResult = payload
  },
  [types.SET_RESULT_CONFIRM_DIALOG](state, payload) {
    state.confirmDialogResult = payload
  },
  [types.SHOW_CONGRATULATION_DIALOG](state, payload) {
    state.congratulationDialog = payload
  },
  [types.SET_MESSAGE_DIALOG](state, payload) {
    state.messages.push(payload)
  },
  [types.CLEAR_MESSAGE_DIALOG](state) {
    state.messages = []
    state.congratulationDialog = false
    state.defaultDialog = false
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
