<template>
    <div class="signup container">
        <div class="card">
            <h4 class="heading center">Signup</h4>
            <form @submit.prevent="signup">
                <div class="field">
                    <label for="firstName">First Name:</label>
                    <input type="text" name="firstName" v-model="firstName">
                </div>
                <div class="field">
                    <label for="lastName">Last Name:</label>
                    <input type="text" name="lastName" v-model="lastName">
                </div>
                <div class="field">
                    <label for="nickName">Nick Name:</label>
                    <input type="text" name="nickName" v-model="nickName">
                </div>
                <div class="field">
                    <label for="email">Email:</label>
                    <input type="email" name="email" v-model="email">
                </div>
                <div class="field">
                    <label for="password">Password:</label>
                    <input type="password" name="password" v-model="password">
                </div>
                <p class="red-text" v-if="feedback">{{ feedback }}</p>
                <div class="field center">
                    <button class="btn deep-purple">Signup</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>

import firebase from 'firebase'
import db from '@/firebase/init'

export default {
  name: 'Signup',
  data () {
    return {
      firstName: null,
      lastName: null,
      nickName: null,
      email: null,
      password: null,
      feedback: null
    }
  },
  methods: {
    signup () {
      if (this.firstName && this.lastName && this.email && this.password) {
        this.feedback = null
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(cred => {
          db.collection('users').doc(this.email).set({
            email: this.email,
            name: {
              firstName: this.firstName,
              lastName: this.lastName,
              nickName: this.nickName
            },
            user_id: cred.user.uid
          })
        }).then(() => {
          this.$router.push({ name: 'TodayList' })
        }).catch(err => {
          this.feedback = err.message
        })
      } else {
        this.feedback = 'You must enter all fields'
      }
    }
  }
}
</script>

<style>
    .signup .field {
        margin-bottom: 16px;
    }
</style>
