import store from './store'
import Vue from 'vue'
import Router from 'vue-router'

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
      meta: { layout: 'Home' },
      component: () => import('./views/Home.vue')
    },
    {
      path: "/login",
      name: "login",
      meta: { layout: 'Home', requiredGuest: true },
      component: () => import('./views/Login.vue')
    },
    {
      path: "/register",
      name: "register",
      meta: { layout: 'Home', requiredGuest: true },
      component: () => import('./views/Register.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      meta: { layout: 'Home' },
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/email-confirmation',
      name: 'email_confirmation',
      meta: { layout: 'Home' },
      component: () => import('./views/EmailConfirmation.vue')
    },
    {
      path: "/trips",
      name: "trips",
      meta: { requiresAuth: true },
      component: () => import('./views/Trips.vue')
    },
    {
      path: "/show-trip/:id",
      name: "show_trip",
      meta: { requiresAuth: true, layout: 'Map' },
      component: () => import('./views/ShowTrip.vue')
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
