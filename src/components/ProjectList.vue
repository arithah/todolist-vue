<template>
    <div class="project-list container">
        <div class="card">
            <h4 class="heading center">Projects</h4>
            <div class="card-content">
                <ul class="collection" v-for="project in projects" :key="project.id">
                    <li class="collection-item" >
                        {{ project.displayName }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>

import firebase from 'firebase'
import db from '@/firebase/init'

export default {
  name: 'ProjectList',
  data () {
    return {
      projects: []
    }
  },
  created () {
    // get current user
    const user = firebase.auth().currentUser
    // fetch project list data from firestore
    db.collection('projects').where('users.user_id', '==', user.uid).get().then(snapshot => {
      snapshot.forEach(doc => {
        let projectList = doc.data()
        projectList.id = doc.id
        this.projects.push(projectList)
      })
    })
  }
}
</script>

<style>

</style>
