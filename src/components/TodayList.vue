<template>
  <div class="today-list container">
    <div class="card">
      <div class="card-content">
        <ShowTodo class="center" heading="Today's List" :todoList="todoList" @updateTodo="updateTodo" @deleteTodo="deleteTodo"/>
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
import NewTodo from '@/components/NewTodo'
import ShowTodo from '@/components/ShowTodo'
import db from '@/firebase/init'

export default {
  name: 'TodayList',
  components: {
    NewTodo,
    ShowTodo
  },
  data () {
    return {
      title: "Today's List",
      todoList: []
    }
  },
  created () {
    this.getTodoList()
  },
  methods: {
    getTodoList () {
      this.todoList = []
      // fetch todo list data from firestore
      db.collection('todoList').get().then(snapshot => {
        snapshot.forEach(doc => {
          let todoList = doc.data()
          todoList.id = doc.id
          this.todoList.push(todoList)
        })
      })
    },
    updateTodo (payload) {
      db.collection('todoList').doc(payload.todo.id).update({
        displayName: payload.todo.displayName,
        status: payload.todo.status === 'inprogress' ? 'completed' : 'inprogress'
      }).catch(err => {
        console.log(err)
      })
    },
    deleteTodo (payload) {
      db.collection('todoList').doc(payload.todo.id).delete();
    }
  }
}
</script>

<style>
.card {
  box-shadow: none;
}
</style>
