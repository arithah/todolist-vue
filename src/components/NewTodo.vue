<template>
  <div class="new-todo container">
    <div class="card">
      <div class="card-content">

        <h4 class="heading center">Add To Do</h4>
        <div class="add-todo">
          <input type="text" class="validate" @keydown.tab.prevent="AddToDo" v-model="newToDo">
          <span class="error-text" data-error="wrong" data-success="right">{{ message }}</span>
          <div class="field center">
            <button class="btn pink accent-3">Add Todo</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from '@/firebase/init'

export default {
  name: 'NewTodo',
  data () {
    return {
      message: null,
      newToDo: null
    }
  },
  methods: {
    AddToDo () {
      if (this.newToDo) {
        db.collection('todoList').add({
          displayName: this.newToDo,
          status: 'inprogress'
        }).then(() => {
          this.$router.push({ name: 'TodayList' })
        }).catch(err => {
          console.log(err)
        })
        this.message = null
      } else {
        this.message = 'You must enter a new to do'
      }
    }
  }
}
</script>

<style>
  .add-todo .field {
    margin-top: 16px;
  }
</style>
