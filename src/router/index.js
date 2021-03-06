import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'
import Signup from '@/components/auth/Signup'
import Login from '@/components/auth/Login'
import Home from '@/components/layout/Home'
import NewProject from '@/components/todos/NewProject'
import NewTodo from '@/components/todos/NewTodo'
import EditTodo from '@/components/todos/EditTodo'
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
      path: '/:status',
      name: 'Home',
      component: Home,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/projects/:projectid',
      name: 'Projects',
      component: Home,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/new-project',
      name: 'NewProject',
      component: NewProject,
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
