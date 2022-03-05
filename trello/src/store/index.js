import Vue from 'vue'
import Vuex from 'vuex'
import user from './user/index'
import board from './board/index'
import list from './list/index'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    board,
    list
  }
})
