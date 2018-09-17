<template>
  <div class="today-list container">
    <div class="card">
      <div class="card-content">

        <h4 class="heading center">Today's List</h4>
        <TodoList
          class="center"
          :todoList="todoList"
          @updateTodo="updateTodo"
          @deleteTodo="deleteTodo"
          showStatus="inprogress"
        />

        <h5 class="heading center">Completed</h5>
        <TodoList
          class="center"
          :todoList="todoList"
          @updateTodo="updateTodo"
          @deleteTodo="deleteTodo"
          showStatus="completed"
        />
      </div>

      <span class="btn-floating btn-large halfway-fab pink accent-3">
        <router-link :to="{ name: 'NewTodo'}">
          <i class="material-icons">add</i>
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>

import firebase from 'firebase'
import NewTodo from '@/components/NewTodo'
import TodoList from '@/components/TodoList'
import db from '@/firebase/init'

export default {
  name: 'TodayList',
  components: {
    NewTodo,
    TodoList
  },
  data () {
    return {
      user: null,
      title: "Today's List",
      todoList: []
    }
  },
  created () {
    // get current user
    this.user = firebase.auth().currentUser

    // fetch todo list data from firestore
    db.collection('todoList').get().then(snapshot => {
      snapshot.forEach(doc => {
        let todoList = doc.data()
        todoList.id = doc.id
        this.todoList.push(todoList)
      })
    })
  },
  methods: {
    updateTodo (payload) {
      db.collection('todoList').doc(payload.todo.id).update({
        timestamp: Date.now(),
        status: payload.todo.status === 'inprogress' ? 'completed' : 'inprogress'
      }).catch(err => {
        console.log(err)
      })
      // db.collection('todoList').doc(todo.id).update({
      //   email: this.user.email,
      //   timestamp: Date.now(),
      //   displayName: todo.displayName,
      //   status: todo.status === 'inprogress' ? 'completed' : 'inprogress'
      // }).then(() => {
      //   // setTimeout(() => {
      //   //   // manual update within UI
      //   //   const _todoList = this.todoList.map(todo => {
      //   //     if (todo.id === todo.id) {
      //   //       todo.status = todo.status === 'inprogress' ? 'completed' : 'inprogress'
      //   //     }
      //   //     return todo
      //   //   })
      //   //   this.todoList = _todoList
      //   // }, 500)
      // }).catch(err => {
      //   console.log(err)
      // })
    },
    deleteTodo (payload) {
      db.collection('todoList').doc(payload.todo.id).delete()
      // this.todoList = this.todoList.filter(todo => {
      //   return todo.id !== todo.id
      // })
    }
  }
}
</script>

<style>
  .card {
    box-shadow: none;
  }
  .card .card-content {
    padding-bottom: 50px;
  }
  .card .card-content .todo-list .delete {
    cursor: pointer;
  }
</style>
