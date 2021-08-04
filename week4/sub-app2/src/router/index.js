import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/chapter1',
    name: '第一章',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/chapter1.vue')
  }
]

const router = new VueRouter({
mode: 'history',
base:process.env.VUE_APP_BASE_PATH ||
(window.__POWERED_BY_QIANKUN__ ? "/sub-app2" : '/'),
  routes
})

export default router
