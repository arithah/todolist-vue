<template>
  <div class="edit-todo container">
    <div class="card">
      <h4 class="heading center">Edit To Do</h4>
      <div class="card-content">
        <div class="edit-todo">
          <div class="field">
            <label for="edittodo">To Do</label>
            <input type="text" name="edittodo" class="validate" @keydown.enter.prevent="editTodo" v-model="todoContent">
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
          <!-- <input type="text" class="validate" @keydown.enter.prevent="editTodo" v-model="todoContent"> -->
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
import firebase from 'firebase'

export default {
  name: 'EditTodo',
  props: [ 'todo' ],
  data () {
    return {
      message: null,
      todoContent: null,
      projects: [],
      selectedProject: null
    }
  },
  created () {
    if (this.todo) {
      this.todoContent = this.todo.displayName
    }
    // get current user
    const user = firebase.auth().currentUser
    // fetch projects from firestore
    db.collection('projects').where('users.user_id', '==', user.uid).get().then(snapshot => {
      snapshot.forEach(doc => {
        if (doc.data().displayName === 'Inbox') {
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
    editTodo () {
      if (this.todoContent) {
        db.collection('todoList').doc(this.todo.id).update({
          timestamp: Date.now(),
          displayName: this.todoContent,
          projectDetails: {
            project_id: this.selectedProject.id,
            project_name: this.selectedProject.name
          }
        }).then(() => {
          this.$router.push({ name: 'Home', params: { status: 'inprogress', title: 'Inbox' } })
        }).catch(err => {
          console.log(err)
        })
        this.message = null
      } else {
        this.message = 'You must enter a to do'
      }
    },
    cancel () {
      this.$router.push({ name: 'Home', params: { status: 'inprogress', title: 'Inbox' } })
    }
  }
}
</script>

<style>
  .edit-todo .field {
    margin-top: 16px;
  }
</style>
