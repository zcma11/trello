import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Message from '@/components/TMessage/index.js'
import './assets/css/css.css'

Vue.prototype.$message = Message
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
