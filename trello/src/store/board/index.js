import { getBoards, addBoard, getBoard } from '@/api'

export default {
  namespaced: true,
  state: {
    boards: null,
    inited: false
  },
  getters: {
    getBoard:
      ({ boards }) =>
      id =>
      boards ? boards.find(item => item.id == id) : null
  },
  mutations: {
    updateBoards: (state, data) => {
      state.boards = data
      state.inited = true
    },
    addBoard: (state, data) => {
      if (state.boards == null) {
        state.boards = [data]
      } else {
        state.boards = [...state.boards, data]
      }
    }
  },
  actions: {
    getAllBoards: async ({ commit }) => {
      try {
        const boards = await getBoards()
        commit('updateBoards', boards.data)
      } catch (e) {
        throw e
      }
    },
    getBoard: async ({ commit }, id) => {
      try {
        const res = await getBoard(id)
        commit('addBoard', res.data)
      } catch (e) {
        throw e
      }
    },
    postBoard: async ({ commit }, data) => {
      try {
        const board = await addBoard(data)
        commit('addBoard', board.data)
      } catch (e) {
        throw e
      }
    }
  }
}
