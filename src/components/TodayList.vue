<template>
  <div class="today-list container">
    <h4 class="center">{{ title }}</h4>
    <ShowTodo class="center"/>
  </div>
</template>

<script>
import ShowTodo from '@/components/ShowTodo'

export default {
  name: 'TodayList',
  components: {
    ShowTodo
  },
  data () {
    return {
      title: "Today's List"
    }
  }
}
</script>

<style>
</style>
