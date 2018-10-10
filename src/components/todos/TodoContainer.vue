<template>
  <div class="today-list">
    <div class="card">
    <h4 class="heading center">{{ heading }}</h4>
      <div class="card-content">
        <TodoList
          :todoList="todoList"
          @handleTodo="handleTodo"
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
      user: null,
      todoList: []
    }
  },
  created () {
    // get current user
    this.user = firebase.auth().currentUser
    this.fetchTodo()
  },
  watch: {
    '$route.params' (to, from) {
      console.log('params', to)
      if (to.projectid) {
        this.todoList = []
        db.collection('todoList')
          .where('user_id', '==', this.user.uid)
          .where('projectDetails.project_id', '==', this.$route.params.projectid)
          .orderBy('timestamp', 'desc').get().then(snapshot => {
            snapshot.forEach(doc => {
              let todoList = doc.data()
              todoList.id = doc.id
              this.todoList.push(todoList)
            })
          })
      } else {
        this.fetchTodo()
      }
    }
    // '$route.params.projectid' (to, from) {
    //   if (to) {
    //     this.todoList = []
    //     db.collection('todoList')
    //       .where('user_id', '==', this.user.uid)
    //       .where('projectDetails.project_id', '==', this.$route.params.projectid)
    //       .orderBy('timestamp', 'desc').get().then(snapshot => {
    //         snapshot.forEach(doc => {
    //           let todoList = doc.data()
    //           todoList.id = doc.id
    //           this.todoList.push(todoList)
    //         })
    //       })
    //   } else {
    //     this.fetchTodo()
    //   }
    // }
  },
  methods: {
    fetchTodo () {
      console.log('_status', this.$route.params.status)
      // fetch 'inprogress'todo list data from firestore
      this.todoList = []
      const _status = this.$route.params.status ? this.$route.params.status : 'inprogress'
      db.collection('todoList')
        .where('user_id', '==', this.user.uid)
        .where('status', '==', _status)
        .orderBy('timestamp', 'desc').get().then(snapshot => {
          snapshot.forEach(doc => {
            let todoList = doc.data()
            todoList.id = doc.id
            this.todoList.push(todoList)
          })
        })
      console.log('todolist', this.todoList)
    },
    handleTodo (payload) {
      db.collection('todoList').doc(payload.todo.id).update({
        timestamp: Date.now(),
        status: payload.status
      }).then(() => {
        // manual update within UI
        this.todoList[payload.index].status = payload.status
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
