<template>
  <div class="new-project container">
    <div class="card">
      <h4 class="heading center">Add a Project</h4>
      <div class="card-content">
        <div class="add-project">
          <input type="text" class="validate" @keydown.enter.prevent="addProject" v-model="newProject">
          <p class="red-text center" v-if="message">{{ message }}</p>
          <div class="field center">
            <button @click="addProject" class="btn pink accent-3">Add Project</button>
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
  name: 'NewProject',
  data () {
    return {
      user: null,
      message: null,
      newProject: null
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
    addProject () {
      if (this.newProject) {
        db.collection('projects').add({
          creator: this.user.email,
          displayName: this.newProject,
          timestamp: Date.now(),
          users: {
            user_id: this.user.user_id
          }
        }).then(() => {
          this.$router.push({ name: 'Home', params: { status: 'inprogress', title: 'Inbox' } })
        }).catch(err => {
          console.log(err)
        })
        this.message = null
      } else {
        this.message = 'You must enter a new Project'
      }
    },
    cancel () {
      this.$router.push({ name: 'Home', params: { status: 'inprogress', title: 'Inbox' } })
    }
  }
}
</script>

<style>
  .add-project .field {
    margin-top: 16px;
  }
</style>
