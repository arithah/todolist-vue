<template>
    <div class="login container">
        <div class="card">
            <h4 class="heading center">Login</h4>
            <form @submit.prevent="login">
                <div class="field">
                    <label for="email">Email:</label>
                    <input type="email" name="email" v-model="email">
                </div>
                <div class="field">
                    <label for="password">Password:</label>
                    <input type="password" name="password" v-model="password">
                </div>
                <p class="red-text" v-if="feedback">{{ feedback }}</p>
                <p class="black-text center">Don't have an account? <router-link :to="{ name: 'Signup'}"><a href="">Sign up here</a></router-link></p>
                <div class="field center">
                    <button class="btn deep-purple">login</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>

import firebase from 'firebase'

export default {
  name: 'Login',
  data () {
    return {
      email: null,
      password: null,
      feedback: null
    }
  },
  methods: {
    login () {
      if (this.email && this.password) {
        this.feedback = null
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(cred => {
          this.$router.push({ name: 'Home', params: { status: 'inprogress', title: 'Inbox' } })
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
    .login .field {
        margin-bottom: 16px;
    }
</style>
