<template>
    <div class="show-todo container">
      <h5 class="center">- {{ heading }} -</h5>
      <div class="todo">
        <p v-for="(todo, index) in todoList" :key="todo.id">
          <label @click="todoClick(todo, index)">
            <input type="checkbox" class="filled-in" />
            <span>{{ todo.displayName }}</span>
          </label>
        </p>
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
    todoClick (todo, index) {
      this.todoList[index].status = todo.status === 'inprogress' ? 'completed' : 'inprogress'
    }
  }
}
</script>

<style>
  .show-todo .add-todo .add-todo-field {
    display: inline-block;
    width: 100px;
  }
  .show-todo .todo {
    width: 200px;
  }
  .show-todo .todo li {
    display: inline-block;
  }
 .show-todo .todo .checkbox {
   font-size: 18px;
   color: #3700B3;
 }
</style>
