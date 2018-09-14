<template>
    <div class="show-todo container">
        <ul v-for="todo in todoList" :key="todo.id">
            <li v-if="todo.status=='inprogress'">{{ todo.displayName }}</li>
        </ul>
      <h5 class="center">Completed</h5>
      <ul v-for="todo in todoList" :key="todo.id">
            <li v-if="todo.status=='completed'">{{ todo.displayName }}</li>
        </ul>
    </div>
</template>

<script>
export default {
  name: 'ShowTodo',
  data () {
    return {
      todoList: [
        { id: '1', displayName: 'Call Home', status: 'completed' },
        { id: '2', displayName: 'Get Groceries', status: 'inprogress' },
        { id: '3', displayName: 'Wash Car', status: 'inprogress' }
      ]
    }
  }
}
</script>

<style>

</style>
