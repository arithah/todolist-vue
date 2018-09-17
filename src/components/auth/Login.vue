<template>
    <div class="login container">
        <h4 class="heading center">Login</h4>
        <form @submit.prevent="login" class="card-panel">
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
                <button class="btn deep-purple">login</button>
            </div>
        </form>
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
.login {
    max-width: 400px;
    margin-top: 60px;
}

.login h2 {
    font-size: 2.4em;
}

.login .field {
    margin-bottom: 16px;
}

.login .card-panel {
    box-shadow: none;
}
</style>
