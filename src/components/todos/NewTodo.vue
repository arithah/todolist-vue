<template>
  <div class="new-todo container">
    <div class="card">
      <h4 class="heading center">Add To Do</h4>
      <div class="card-content">
        <div class="add-todo">
          <div class="field">
            <label for="addtodo">To Do</label>
            <input type="text" name="addtodo" class="validate" @keydown.enter.prevent="addToDo" v-model="newToDo">
          </div>
          <div class="field">
            <label for="addtodo">Select a project</label>
            <p v-for="project in projects" :key="project.id">
              <label>
                <input name="project.project_id" type="radio" @click="handleSelect(project)" :checked="project.id === selectedProject.id"/>
                <span>{{ project.displayName }}</span>
              </label>
            </p>
          </div>
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
      projects: [],
      newToDo: null,
      selectedProject: null
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
    // fetch projects from firestore
    db.collection('projects').where('users.user_id', '==', user.uid).get().then(snapshot => {
      snapshot.forEach(doc => {
        if (doc.data().displayName === 'Inbox') {
          console.log('project Inbox')
          this.selectedProject = {
            id: doc.id,
            name: doc.data().displayName
          }
        }
        let project = doc.data()
        project.id = doc.id
        this.projects.push(project)
      })
    })
  },
  methods: {
    handleSelect (project) {
      this.selectedProject = {
        id: project.id,
        name: project.displayName
      }
    },
    addToDo () {
      if (this.newToDo) {
        db.collection('todoList').add({
          user_id: this.user.user_id,
          userDetails: {
            name: this.user.name,
            email: this.user.email
          },
          projectDetails: {
            project_id: this.project.id,
            project_name: this.project.name
          },
          timestamp: Date.now(),
          displayName: this.newToDo,
          status: 'inprogress'
        }).then(() => {
          this.$router.push({ name: 'Home', params: { status: 'inprogress', title: 'Inbox' } })
        }).catch(err => {
          console.log(err)
        })
        this.message = null
      } else {
        this.message = 'Please enter all values'
      }
    },
    cancel () {
      this.$router.push({ name: 'Home', params: { status: 'inprogress', title: 'Inbox' } })
    }
  }
}
</script>

<style>
  .add-todo .field {
    margin-top: 16px;
  }
  select {
    display: inline;
  }
</style>
