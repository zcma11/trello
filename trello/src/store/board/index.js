import { getBoards, addBoard } from '@/api'

export default {
  namespaced: true,
  state: {
    boards: null
  },
  mutations: {
    updateBoards: (state, data) => {
      state.boards = data
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
