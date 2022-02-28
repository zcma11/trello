import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const Home = () => import(/* webpackChunkName: 'Home' */ '@/views/Home.vue')
const Board = () => import(/* webpackChunkName: 'Board' */ '../views/Board.vue')
const Card = () => import(/* webpackChunkName: 'Card' */ '../views/Card.vue')
const Register = () =>
  import(/* webpackChunkName: 'Register' */ '../views/Register.vue')
const Login = () => import(/* webpackChunkName: 'Login' */ '../views/Login.vue')
const NotFound = () =>
  import(/* webpackChunkName: 'NotFound' */ '../views/NotFound.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/board/:id(\\d+)',
    name: 'Board',
    component: Board,
    meta: {
      requireAuth: true
    },
    children: [
      {
        path: 'list/:listId(\\d+)/card/:cardId(\\d+)',
        name: 'Card',
        component: Card
      }
    ]
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // matched 已匹配的路由
  const needAuth = to.matched.some(route => route.meta.requireAuth)
  console.log(needAuth, store.state.user.info)
  if (needAuth && !store.state.user.info) {
    next({ name: 'Login' })
  } else next()
})

export default router
