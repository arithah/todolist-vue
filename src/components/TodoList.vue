<template>
  <div class="todo-list">
    <p v-if="showEmptyMessage()" class="grey-text">{{ emptyMessage }}</p>
    <div class="todo">
      <p v-for="(todo, index) in todoList" :key="todo.id">
        <label v-if="status === todo.status">
          <input type="checkbox" @click="todoClick(todo, index)" class="filled-in" :checked="todo.status === 'completed' ? 'checked' : ''"/>
          <span :class="todo.status">{{ todo.displayName }}</span>
          <i class="material-icons delete right" @click="deleteTodo(todo, index)">delete</i>
          <i class="material-icons edit right" @click.prevent="editTodo(todo)">edit</i>
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
  props: [ 'todoList', 'status', 'emptyMessage' ],
  methods: {
    todoClick (todo, index) {
      this.$emit('updateTodo', { todo, index })
    },
    editTodo (todo) {
      this.$router.push({name: 'EditTodo', params: { todo }})
    },
    deleteTodo (todo, index) {
      this.$emit('deleteTodo', { todo, index })
    },
    showEmptyMessage () {
      const list = this.todoList.filter(todo => {
        return todo.status === this.status
      })
      if (list.length > 0) {
        return false
      }
      return true
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
  .todo-list .todo .edit {
    margin: 0px 2px;
    cursor: pointer;
  }
  .todo-list .todo .delete {
    margin: 0px 2px;
    cursor: pointer;
  }
</style>
