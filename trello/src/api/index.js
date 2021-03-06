import axios from 'axios'
import Message from '@/components/TMessage/index.js'
import store from '@/store'
axios.defaults.baseURL = process.env.VUE_APP_BASE_URL

axios.interceptors.request.use(
  config => {
    const userInfo = store.state.user.info
    if (userInfo) {
      config.headers.authorization = userInfo.token
    }

    return config
  },
  error => {
    return Promise.reject('request error')
  }
)

axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response?.data) {
      const { message, errorDetails } = error.response.data
      const msg = message + ' : ' + errorDetails
      Message.error(msg)
    }
    throw error
  }
)

export const register = async data => {
  return await axios({
    method: 'post',
    url: '/user/register',
    data
  })
}

export const login = async data => {
  return await axios({
    method: 'post',
    url: '/user/login',
    data
  })
}

export const getBoards = async () => {
  return await axios({
    method: 'get',
    url: '/board'
  })
}

export const addBoard = async data => {
  return await axios({
    method: 'post',
    url: '/board',
    data
  })
}

export const getBoard = async id => {
  return await axios({
    url: `/board/${id}`
  })
}

export const getLists = async boardId => {
  return await axios({
    url: '/list',
    params: {
      boardId
    }
  })
}

export const addList = async data => {
  return await axios({
    url: '/list',
    method: 'post',
    data
  })
}

export const updateList = async ([listId, data]) => {
  return await axios({
    url: `/list/${listId}`,
    method: 'put',
    data
  })
}

export const getCards = async boardListId => {
  return await axios({
    url: `/card`,
    params: {
      boardListId
    }
  })
}

export const getCard = async cardId => {
  return await axios({
    url: `/card${cardId}`
  })
}

export const addCard = async data => {
  return await axios({
    url: '/card',
    method: 'post',
    data
  })
}