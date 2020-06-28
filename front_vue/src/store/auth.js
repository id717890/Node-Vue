import * as types from './mutation-types'
import context from '../api/api'
import Vue from 'vue'
import router from '../router'

const state = {
  user: null
}

// getters
const getters = {
  // getToken: state => {
  //   if (!state.user) return null
  //   var n = state.user.access_token.split('.')
  //   if (n.length < 2) return null
  //   var r = JSON.parse(atob(n[0])),
  //     e = JSON.parse(atob(n[1]))
  //   console.log(r)
  //   console.log(e)

  //   return 123
  // },
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
  register({ commit }, payload) {
    context
      .post('/api/auth/register', payload, { responseType: 'json' })
      // eslint-disable-next-line
      .then(x => {
        if (x.status !== 200) {
          if (x.data) {
            if (x.data.errors) {
              x.data.errors.forEach(error => Vue.noty.error(error.msg))
            }
            if (x.data.msg) Vue.noty.error(x.data.msg)
          }
        }
        commit(types.REGISTER)
      })
      .catch(error => {
        console.log(error)
      })
  },
  autoLogin({ commit, dispatch }) {
    let user = {
      token: localStorage.getItem('token'),
      expiration: localStorage.getItem('expiration')
    }
    if (user.token && user.expiration) {
      commit(types.SET_USER, user)
      // router.push('/')
    } else dispatch('logout')
  },
  // async resetPassword({}) {
  //   return await context.post('api/auth/reset')
  // },
  async signUserIn({ commit }, payload) {
    context
      .post('/api/auth/login', payload)
      .then(x => {
        if (x && x.token && x.expiration) {
          Vue.auth.setToken(x.token, x.expiration + Date.now())
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
        console.log(x)
        Vue.noty.error('ERROR CATCH')
      })
  },

  async logout({ commit }) {
    Vue.auth.logout()
    commit(types.SET_USER, null)
    // router.push('/login')
  }
}

// mutations
const mutations = {
  [types.REGISTER]() {},
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
