<template>
    <div class="completed-list container">
        <div class="card">
            <div class="card-content">
                <ShowTodo class="center" heading="Completed List" :todoList="todoList" @updateTodo="updateTodo" @deleteTodo="deleteTodo" showStatus="completed" />
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
import ShowTodo from '@/components/ShowTodo'
import db from '@/firebase/init'

export default {
  name: 'CompletedTodo',
  components: {
    ShowTodo
  },
  data () {
    return {
      todoList: []
    }
  },
  created () {
    db.collection('todoList').get().then(snapshot => {
      snapshot.forEach(doc => {
        if (doc.data().status === 'completed') {
          let todo = doc.data()
          todo.id = doc.id
          this.todoList.push(todo)
        }
      })
    })
  },
  methods: {
    updateTodo (payload) {
      db.collection('todoList').doc(payload.todo.id).update({
        displayName: payload.todo.displayName,
        status: payload.todo.status === 'inprogress' ? 'completed' : 'inprogress'
      }).then(() => {
        setTimeout(() => {
          // manual update within UI
          const _todoList = this.todoList.map(todo => {
            if (todo.id === payload.todo.id) {
              todo.status = payload.todo.status === 'inprogress' ? 'completed' : 'inprogress'
            }
            return todo
          })
          this.todoList = _todoList
        }, 500)
      }).catch(err => {
        console.log(err)
      })
    },
    deleteTodo (payload) {
      db.collection('todoList').doc(payload.todo.id).delete()
      this.todoList = this.todoList.filter(todo => {
        return todo.id !== payload.todo.id
      })
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
</style>
