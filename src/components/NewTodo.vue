<template>
  <div class="new-todo container">
    <div class="card">
      <h4 class="heading center">Add To Do</h4>
      <div class="card-content">
        <div class="add-todo">
          <input type="text" class="validate" @keydown.enter.prevent="addToDo" v-model="newToDo">
          <p class="red-text center" v-if="message">{{ message }}</p>
          <div class="field center">
            <button @click="addToDo" class="btn pink accent-3">Add Todo</button>
            <button @click="cancel" class="btn pink accent-2">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import firebase from 'firebase'
import db from '@/firebase/init'

export default {
  name: 'NewTodo',
  data () {
    return {
      user: null,
      message: null,
      newToDo: null
    }
  },
  created () {
    // get current user
    const user = firebase.auth().currentUser
    // get user details
    db.collection('users').where('user_id', '==', user.uid).get().then(snapshot => {
      snapshot.forEach(doc => {
        this.user = doc.data()
        this.user.id = doc.id
      })
    })
  },
  methods: {
    addToDo () {
      if (this.newToDo) {
        db.collection('todoList').add({
          user_id: this.user.user_id,
          userDetails: {
            name: this.user.name,
            email: this.user.email
          },
          timestamp: Date.now(),
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
    },
    cancel () {
      this.$router.push({ name: 'TodayList' })
    }
  }
}
</script>

<style>
  .add-todo .field {
    margin-top: 16px;
  }
</style>
