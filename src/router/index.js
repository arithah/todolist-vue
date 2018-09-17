import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'
import Signup from '@/components/auth/Signup'
import Login from '@/components/auth/Login'
import TodayList from '@/components/TodayList'
import NewTodo from '@/components/NewTodo'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'TodayList',
      component: TodayList,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/new-todo',
      name: 'NewTodo',
      component: NewTodo,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  // check to see if the route requires auth
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    // check auth state of user
    const user = firebase.auth().currentUser
    if (user) {
      next()
    } else {
      next({ name: 'Login' })
    }
  } else {
    next()
  }
})

export default router
