<template>
  <div class="todo-list">
    <div class="todo">
      <p v-for="(todo, index) in todoList" :key="todo.id">
        <label v-if="status === todo.status">
          <input type="checkbox" @click="todoClick(todo, index)" class="filled-in" :checked="todo.status === 'completed' ? 'checked' : ''"/>
          <span :class="todo.status">{{ todo.displayName }}</span>
          <i class="material-icons delete right" @click="deleteTodo(todo, index)">delete</i>
        </label>
      </p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'TodoList',
  data () {
    return {

    }
  },
  props: [ 'todoList', 'status' ],
  methods: {
    todoClick (todo, index) {
      this.$emit('updateTodo', { todo, index })
    },
    deleteTodo (todo, index) {
      this.$emit('deleteTodo', { todo, index })
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
