<template>
  <div class="today-list">
    <div class="card">
    <h4 class="heading center">{{ heading }}</h4>
      <div class="card-content">
        <TodoList
          :todoList="todoList"
          @updateTodo="updateTodo"
          @deleteTodo="deleteTodo"
          :status="status"
          emptyMessage="You have no tasks for today"
        />
      </div>
    </div>
    <div class="fixed-action-btn">
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
import NewTodo from '@/components/todos/NewTodo'
import TodoList from '@/components/todos/TodoList'
import db from '@/firebase/init'

export default {
  name: 'TodoContainer',
  components: {
    NewTodo,
    TodoList
  },
  props: [ 'status', 'heading' ],
  data () {
    return {
      todoList: []
    }
  },
  created () {
    // get current user
    const user = firebase.auth().currentUser
    // fetch todo list data from firestore
    db.collection('todoList').where('user_id', '==', user.uid).orderBy('timestamp', 'desc').get().then(snapshot => {
      snapshot.forEach(doc => {
        let todoList = doc.data()
        todoList.id = doc.id
        this.todoList.push(todoList)
      })
    })
  },
  methods: {
    updateTodo (payload) {
      const status = payload.todo.status === 'inprogress' ? 'completed' : 'inprogress'
      db.collection('todoList').doc(payload.todo.id).update({
        timestamp: Date.now(),
        status
      }).then(() => {
        // manual update within UI
        this.todoList[payload.index].status = status
      }).catch(err => {
        console.log(err)
      })
    },
    deleteTodo (payload) {
      db.collection('todoList').doc(payload.todo.id).delete().then(() => {
        // manual update within UI
        this.todoList.splice(payload.index, 1)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style>
  .card .card-content {
    padding: 0px;
  }
  .fixed-action-btn {
    right: 0px;
    bottom: 45px;
  }
</style>
