<template>
  <div class="edit-todo container">
    <div class="card">
      <h4 class="heading center">Edit To Do</h4>
      <div class="card-content">
        <div class="edit-todo">
          <input type="text" class="validate" @keydown.enter.prevent="editTodo" v-model="todoContent">
          <p class="red-text center" v-if="message">{{ message }}</p>
          <div class="field center">
            <button @click="editTodo" class="btn pink accent-3">Edit Todo</button>
            <button @click="cancel" class="btn pink accent-2">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import db from '@/firebase/init'

export default {
  name: 'EditTodo',
  props: [ 'todo' ],
  data () {
    return {
      message: null,
      todoContent: null
    }
  },
  created () {
    if (this.todo) {
      this.todoContent = this.todo.displayName
    }
  },
  methods: {
    editTodo () {
      if (this.todoContent) {
        db.collection('todoList').doc(this.todo.id).update({
          timestamp: Date.now(),
          displayName: this.todoContent
        }).then(() => {
          this.$router.push({ name: 'Home' })
        }).catch(err => {
          console.log(err)
        })
        this.message = null
      } else {
        this.message = 'You must enter a to do'
      }
    },
    cancel () {
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>

<style>
  .edit-todo .field {
    margin-top: 16px;
  }
</style>
