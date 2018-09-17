import Vue from 'vue'
import Router from 'vue-router'
import TodayList from '@/components/TodayList'
import NewTodo from '@/components/NewTodo'
import CompletedTodo from '@/components/CompletedTodo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TodayList',
      component: TodayList
    },
    {
      path: '/new-todo',
      name: 'NewTodo',
      component: NewTodo
    },
    {
      path: '/completed-todo',
      name: 'CompletedTodo',
      component: CompletedTodo
    }
  ]
})
