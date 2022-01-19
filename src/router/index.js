import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import firebase from 'firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      restricted: false
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
    meta: {
      restricted: false
    }
  },
  {
    path: '/panel',
    name: 'Panel',
    component: () => import('../views/Panel.vue'),
    meta: {
      restricted: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const user = firebase.auth().currentUser
  const restrictedPath = to.meta.restricted

  if (!user && restrictedPath) {
    next('/')
  } else if (user && !restrictedPath) {
    next('/panel')
  } else {
    next()
  }
})


export default router
