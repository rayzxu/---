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
  },
  {
    path: '/chapter2',
    name: '第二章',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/chapter2.vue')
  },
  {
    path: '/chapter3',
    name: '第三章',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/chapter3.vue')
  }
]

const router = new VueRouter({
mode: 'history',
base:process.env.VUE_APP_BASE_PATH ||
(window.__POWERED_BY_QIANKUN__ ? "/sub-app1" : '/'),
  routes
})

export default router
