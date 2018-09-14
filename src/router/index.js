import Vue from 'vue'
import Router from 'vue-router'
import TodayList from '@/components/TodayList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TodayList',
      component: TodayList
    }
  ]
})
