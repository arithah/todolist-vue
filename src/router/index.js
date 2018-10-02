import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'
import Signup from '@/components/auth/Signup'
import Login from '@/components/auth/Login'
import Home from '@/components/layout/Home'
import NewTodo from '@/components/NewTodo'
import EditTodo from '@/components/EditTodo'
import ViewProfile from '@/components/layout/ViewProfile'

Vue.use(Router)

const router = new Router({
  mode: 'history',
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
      name: 'Home',
      component: Home,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/completed',
      name: 'Completed',
      component: Home,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/deleted',
      name: 'Deleted',
      component: Home,
      props: true,
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
    },
    {
      path: '/edit-todo',
      name: 'EditTodo',
      component: EditTodo,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/view-profile',
      name: 'ViewProfile',
      component: ViewProfile,
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
