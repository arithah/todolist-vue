<template>
  <div id="app">
    <Navbar />
    <div class="add-to-home-alert" v-if="showInstallMessage">
      <i class="material-icons close-icon" @click="closeInstallMessage">close</i>
      <div>Install this as an app on your device: tap "share" and then "Add to Homescreen"</div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/layout/Navbar'

export default {
  name: 'App',
  components: {
    Navbar
  },
  data () {
    return {
      showInstallMessage: false
    }
  },
  created () {
    // Detects if device is on iOS
    const isIos = () => {
      const userAgent = window.navigator.userAgent.toLowerCase()
      return /iphone|ipad|ipod/.test(userAgent)
    }
    // Detects if device is in standalone mode
    const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone)

    // Checks if should display install popup notification:
    if (isIos() && !isInStandaloneMode()) {
      this.showInstallMessage = true
    }
  },
  methods: {
    closeInstallMessage () {
      this.showInstallMessage = false
    }
  }
}
</script>

<style>
  .container {
    max-width: 400px;
    margin-top: 60px;
  }
  .card {
    box-shadow: none;
    max-width: 400px;
  }
  .add-to-home-alert {
    background-color: #26a69a;
    color: white;
    border: 1px solid #26a96a;
    border-style: solid;
    padding: 10px;
  }
  .add-to-home-alert .close-icon {
    float: right;
    margin: 2px;
  }
</style>
