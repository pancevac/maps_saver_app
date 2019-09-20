import store from './store'
import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Trips from "./views/Trips";
import Login from "./views/Login";
import Register from "./views/Register";

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: "*",
      redirect: '/'
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { layout: 'Home' }
    },
    {
      path: "/login",
      name: "login",
      meta: { layout: 'Home', requiredGuest: true },
      component: Login
    },
    {
      path: "/register",
      name: "register",
      meta: { layout: 'Home', requiredGuest: true },
      component: Register
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: "/trips",
      name: "trips",
      component: Trips,
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const currentUser = store.getters['auth/authUser']
  const requiredAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiredGuest = to.matched.some(record => record.meta.requiredGuest)

  if (requiredAuth && !currentUser) next({name: "login"})
  else if (requiredGuest && currentUser) next({name: "home"})
  else next()
})

export default router
