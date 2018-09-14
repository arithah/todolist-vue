<template>
  <div class="today-list container">
    <NewTodo />
    <ShowTodo class="center" heading="Today" :todoList="todoList" />
  </div>
</template>

<script>
import NewTodo from '@/components/NewTodo'
import ShowTodo from '@/components/ShowTodo'

export default {
  name: 'TodayList',
  components: {
    NewTodo,
    ShowTodo
  },
  data () {
    return {
      title: "Today's List",
      todoList: [
        { id: '0', displayName: 'Call Home', status: 'completed' },
        { id: '1', displayName: 'Get Groceries', status: 'inprogress' },
        { id: '2', displayName: 'Wash Car', status: 'inprogress' }
      ]
    }
  }
}
</script>

<style>
</style>
