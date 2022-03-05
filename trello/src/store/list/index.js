import { getLists, addList } from '@/api'

export default {
  namespaced: true,

  state: {
    lists: []
  },
  getters: {
    getList: ({ lists }) => boardId => lists.filter(item => item.boardId == boardId)
  },
  mutations: {
    updateLists: (state, data) => {
      state.lists = [...state.lists, ...data]
    }
  },
  actions: {
    getLists: async ({ commit }, boardId) => {
      try {
        const res = await getLists(boardId)

        commit('updateLists', res.data)
      } catch (e) {
        throw e
      }
    },
    postList: async ({ commit }, data) => {
      try {
        const res = await addList(data)

        commit('updateLists', [res.data])
      } catch (e) {
        throw e
      }
    }
  }
}
