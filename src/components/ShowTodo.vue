<template>
  <div class="container">
    <h4 class="heading">{{ heading }}</h4>
    <div class="show-todo">
      <div class="todo">
        <p v-for="(todo, index) in todoList" :key="todo.id">
          <label>
            <input type="checkbox" @click="todoClick(todo, index)" class="filled-in" :checked="todo.status === 'completed' ? 'checked' : ''"/>
            <span :class="todo.status">{{ todo.displayName }}</span>
            <i class="material-icons delete right" @click="deleteTodo(todo)">delete</i>
          </label>
        </p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ShowTodo',
  data () {
    return {
      newToDo: null,
      message: 'Hit Tab to add to do'
    }
  },
  props: [ 'heading', 'todoList' ],
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
  .show-todo .todo p {
    text-align: left;
  }
  .show-todo .todo .completed {
    text-decoration-line: line-through;
  }
  .show-todo .todo .delete {
    cursor: pointer;
  }
</style>
