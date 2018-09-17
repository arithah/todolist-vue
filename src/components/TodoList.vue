<template>
  <div class="todo-list">
    <div class="todo">
      <p v-for="(todo, index) in todoList" :key="todo.id">
        <label v-if="showStatus === todo.status">
          <input type="checkbox" @click="todoClick(todo, index)" class="filled-in" :checked="todo.status === 'completed' ? 'checked' : ''"/>
          <span :class="todo.status">{{ todo.displayName }}</span>
          <i class="material-icons delete right" @click="deleteTodo(todo)">delete</i>
        </label>
      </p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'TodoList',
  data () {
    return {}
  },
  props: [ 'todoList', 'showStatus' ],
  methods: {
    todoClick (todo) {
      this.$emit('updateTodo', { todo })
    },
    deleteTodo (todo) {
      this.$emit('deleteTodo', { todo })
    }
  }
}
</script>

<style>
  .heading {
    padding-bottom: 25px;
  }
  .todo-list .todo p {
    text-align: left;
  }
  .todo-list .todo .completed {
    text-decoration-line: line-through;
  }
  .todo-list .todo .delete {
    cursor: pointer;
  }
</style>
