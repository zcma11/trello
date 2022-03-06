import { getCards, getCard, addCard } from '@/api'

export default {
  namespaced: true,
  state: {
    cards: []
  },
  getters: {
    getCards:
      ({ cards }) =>
      id =>
        cards.filter(card => card.boardListId == id)
  },
  mutations: {
    updateCards: (state, data) => {
      state.cards = [...state.cards, ...data]
    }
  },
  actions: {
    getAllCards: async ({ commit }, boardListId) => {
      const res = await getCards(boardListId)
      commit('updateCards', res.data)
    },
    getCard: async ({ commit }, data) => {
      const res = await getCard(data)
      commit('updateCards', [res.data])
    },
    postCard: async ({ commit }, data) => {
      const res = await addCard(data)
      console.log(res.data)
      commit('updateCards', [res.data])
    }
  }
}
