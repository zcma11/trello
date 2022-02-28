import axios from 'axios'
import Message from '@/components/TMessage/index.js'
import store from '@/store'
axios.defaults.baseURL = process.env.VUE_APP_BASE_URL

axios.interceptors.request.use(config => {
  const userInfo = store.state.user.info
  if (userInfo) {
    config.headers.authorization = userInfo.token
  }

  return config
}, error => {
  console.log(error)
  return Promise.reject('request error')
})

axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    console.dir(error.response)
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