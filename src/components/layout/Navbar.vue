<template>
    <nav class="nav-wrapper deep-purple accent-4">
        <router-link :to="{ name: 'Home' }" class="brand-logo center">
            Todo List
        </router-link>
        <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
        <ul class="right hide-on-med-and-down">
            <li v-if="!user"><router-link :to="{ name: 'Signup' }">Signup</router-link></li>
            <li v-if="!user"><router-link :to="{ name: 'Login' }">Login</router-link></li>
            <li v-if="user"><router-link :to="{ name: 'ViewProfile' }">{{ user.email }}</router-link></li>
            <li v-if="user"><a @click="logout">Logout</a></li>
        </ul>

        <ul class="sidenav" id="mobile-demo">
          <li v-if="user" @click="closeNav">
            <router-link class="collection-item" :to="{ name: 'Home', params: { status: 'inprogress', title: 'Inbox' }}">
              <span class="badge">12</span><i class="material-icons">inbox</i>Inbox
            </router-link>
          </li>
          <li v-if="user" @click="closeNav">
            <router-link class="collection-item" :to="{ name: 'Completed', params: { status: 'completed', title: 'Completed' }}">
              <i class="material-icons">check</i>Completed
            </router-link>
          </li>
          <li v-if="user" @click="closeNav">
            <router-link class="collection-item" :to="{ name: 'Deleted', params: { status: 'deleted', title: 'Deleted' }}">
              <i class="material-icons">delete</i>Deleted
            </router-link>
          </li>
          <li v-if="user && projects" @click="closeNav">
            <a class="collection-item">Projects</a>
          </li>
          <li v-if="user" v-for="project in projects" :key="project.project_id" @click="closeNav">
            <router-link class="collection-item" :to="{ name: 'Projects', params: { projectid: project.project_id, title: project.displayName }}">
              <i class="material-icons">label</i>{{ project.displayName }}
            </router-link>
          </li>
          <li v-if="!user" @click="closeNav"><router-link :to="{ name: 'Signup' }">Signup</router-link></li>
          <li v-if="!user" @click="closeNav"><router-link :to="{ name: 'Login' }">Login</router-link></li>
          <li v-if="user" @click="closeNav"><router-link :to="{ name: 'ViewProfile' }">{{ user.email }}</router-link></li>
          <li v-if="user"><a @click="logout">Logout</a></li>
        </ul>
    </nav>
</template>

<script>

import firebase from 'firebase'
import Materialize from 'materialize-css'
import db from '@/firebase/init'

export default {
  name: 'Navbar',
  data () {
    return {
      user: null,
      projects: []
    }
  },
  created () {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user
      } else {
        this.user = null
      }
    })

    // get current user
    const user = firebase.auth().currentUser
    // fetch todo list data from firestore
    db.collection('projects').where('users.user_id', '==', user.uid).get().then(snapshot => {
      snapshot.forEach(doc => {
        let project = doc.data()
        project.id = doc.id
        this.projects.push(project)
      })
    })
  },
  mounted () {
    const elems = document.querySelectorAll('.sidenav')
    Materialize.Sidenav.init(elems)
  },
  methods: {
    closeNav () {
      const elems = document.querySelectorAll('.sidenav')
      Materialize.Sidenav.init(elems)
    },
    logout () {
      firebase.auth().signOut().then(() => {
        this.$router.push({ name: 'Login' })
      })

      const elems = document.querySelectorAll('.sidenav')
      Materialize.Sidenav.init(elems)
    }
  }
}
</script>

<style>
  .nav-wrapper {
      padding: 0 20px;
  }
</style>
