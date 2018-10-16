<template>
    <nav class="nav-wrapper deep-purple accent-4">
        <router-link :to="{ name: 'Home', params: { status: 'inprogress', title: 'Inbox' }}" class="brand-logo center">
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
          <li v-if="user" v-for="project in projects" :key="project.id" @click="closeNav">
            <router-link class="collection-item" :to="{ name: 'Projects', params: { status: 'inprogress', projectid: project.id, title: project.displayName }}">
                <i v-if="project.displayName === 'Inbox'" class="material-icons">inbox</i>
                <i v-if="project.displayName !== 'Inbox'" class="material-icons">label</i>
                {{ project.displayName }}
                <!-- <span class="badge">12</span> -->
            </router-link>
          </li>
          <li v-if="user" @click="closeNav">
            <router-link class="collection-item" :to="{ name: 'NewProject'}">
              <i class="material-icons">add</i>Add a Project
            </router-link>
          </li>
          <!-- <li v-if="user" @click="closeNav">
            <router-link class="collection-item" :to="{ name: 'Home', params: { status: 'inprogress', title: 'Inbox' }}">
              <i class="material-icons">inbox</i>Inbox<span class="badge">12</span>
            </router-link>
          </li> -->
          <ul class="bottom-items">
            <li v-if="user" @click="closeNav">
              <router-link class="collection-item" :to="{ name: 'Home', params: { status: 'completed', title: 'Completed' }}">
                <i class="material-icons">check</i>Completed
              </router-link>
            </li>
            <li v-if="user" @click="closeNav">
              <router-link class="collection-item" :to="{ name: 'Home', params: { status: 'deleted', title: 'Deleted' }}">
                <i class="material-icons">delete</i>Deleted
              </router-link>
            </li>
            <li v-if="!user" @click="closeNav"><router-link :to="{ name: 'Signup' }">Signup</router-link></li>
            <li v-if="!user" @click="closeNav"><router-link :to="{ name: 'Login' }">Login</router-link></li>
            <li v-if="user" @click="closeNav"><router-link :to="{ name: 'ViewProfile' }">{{ user.email }}</router-link></li>
            <li v-if="user"><a @click="logout">Logout</a></li>
          </ul>
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
        console.log('user', user)
      } else {
        this.user = null
      }
    })
    // get current user
    const user = firebase.auth().currentUser
    // fetch projects from firestore & update array when changes are made
    db.collection('projects').where('users.user_id', '==', user.uid).onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          let project = change.doc.data()
          project.id = change.doc.id
          this.projects.push(project)
        }
        if (change.type === 'modified') {
          // TODO - modify
        }
        if (change.type === 'removed') {
          // TODO - remove
        }
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
  .nav-wrapper .sidenav .bottom-items {
    position: absolute;
    bottom: 10%;
  }
  .nav-wrapper .sidenav .collection-item .item i {
    display: inline-block;
    padding-right: 20px;
  }
</style>
