import * as types from './mutation-types'
import context from '../api/api'
import Vue from 'vue'
import router from '../router'

const state = {
  user: null
}

// getters
const getters = {
  getToken: state => {
    if (!state.user) return null
    var n = state.user.access_token.split('.')
    if (n.length < 2) return null
    var r = JSON.parse(atob(n[0])),
      e = JSON.parse(atob(n[1]))
    console.log(r)
    console.log(e)

    return 123
  },
  getUser(state) {
    return state.user
  },
  getError(state) {
    return state.error
  },
  getLoading(state) {
    return state.loading
  },
  isAuth: state => state.user != null,
  isAdmin: state => state.role !== null && state.role === 'admin'
}

// actions
const actions = {
  autoLogin({ commit, dispatch }) {
    let user = {
      access_token: localStorage.getItem('token'),
      refresh_token: localStorage.getItem('token'),
      expires_in: localStorage.getItem('expiration')
    }
    if (user.access_token && user.refresh_token && user.expires_in) {
      commit(types.SET_USER, user)
      router.push('/')
    } else dispatch('logout')
  },
  // async resetPassword({}) {
  //   return await context.post('api/auth/reset')
  // },
  async signUserIn({ commit }, payload) {
    var data = new URLSearchParams()
    data.append('username', payload.username)
    data.append('password', payload.password)
    data.append('grant_type', 'password')
    var config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cache-Control': 'no-cache'
      }
    }
    context
      .post('ManagerLogin', data, config)
      .then(x => {
        if (x && x.access_token && x.refresh_token && x.expires_in) {
          Vue.auth.setToken(
            x.access_token,
            x.refresh_token,
            x.expires_in + Date.now()
          )
          commit(types.SET_USER, x)
          router.push('/')
        } else {
          Vue.noty.error('Ошибка входа. Token не обнаружен')
        }
        // if (x) {
        //   let token = x.access_token
        //   let expiration = x.expires_in
        //   let user = x.id
        //   let role = x.role
        //   let name = x.name
        //   commit(types.SET_ROLE, role)
        //   commit(types.SET_NAME, name)
        //   Vue.auth.setToken(token, expiration * 1000 + Date.now())
        //   Vue.auth.setUser(user)
        //   Vue.auth.setRole(role)
        //   Vue.auth.setName(name)
        //   resolve()
        // } else {
        //   reject('auth error')
        // }
      })
      .catch(x => {
        console.log(222)

        if (x.error && x.error_description) Vue.noty.error(x.error_description)
        else Vue.noty.error('ERROR CATCH')
      })
  },

  async logout({ commit }) {
    Vue.auth.logout()
    commit(types.SET_USER, null)
  }
}

// mutations
const mutations = {
  [types.SET_USER](state, payload) {
    state.user = payload
  },

  [types.SET_TOKEN](state, payload) {
    state.token = payload
  },
  [types.SET_ROLE](state, payload) {
    state.role = payload
  },
  [types.SET_NAME](state, payload) {
    state.name = payload
  }
  // [types.SIGN_UP](state, payload) {}
}

export default {
  state,
  getters,
  actions,
  mutations
}
