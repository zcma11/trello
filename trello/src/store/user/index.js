import { register, login } from '@/api'

export default {
  namespaced: true,
  state: {
    info: null
  },
  mutations: {
    initUserInfo: state => {
      try {
        const info = JSON.parse(localStorage.getItem('user'))
        state.info = info
      } catch {}
    },
    updateInfo: (state, data) => {
      state.info = data
      localStorage.setItem('user', JSON.stringify(data))
    }
  },
  actions: {
    register: ({}, data) => {
      return register(data)
    },
    login: async ({ commit }, data) => {
      const response = await login(data)
      if (response.headers.authorization) {
        const { id, name } = response.data
        commit('updateInfo', {
          id,
          name,
          token: response.headers.authorization
        })
      }
    }
  }
}
