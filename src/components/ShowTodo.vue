<template>
  <div class="container">
    <h4 class="heading">{{ heading }}</h4>
    <div class="show-todo">
      <div class="todo">
        <p v-for="(todo, index) in todoList" :key="todo.id">
          <label @click="todoClick(todo, index)">
            <input type="checkbox" class="filled-in" :checked="todo.status === 'completed' ? 'checked' : ''"/>
            <span :class="todo.status">{{ todo.displayName }}</span>
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
    }
    // todoClick (todo, index) {
    //   console.log(todo.status);
    //   let _status = 'inprogress'
    //   if (todo.status === 'inprogress') {
    //     _status = 'completed'
    //   }
    //   db.collection('todoList').doc(todo.id).update({
    //     displayName: todo.displayName,
    //     status: _status
    //     // status: todo.status === 'inprogress' ? 'completed' : 'inprogress'
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // }
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
</style>
