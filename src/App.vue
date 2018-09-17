<template>
  <div id="app">
    <Navbar />
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/layout/Navbar'

export default {
  name: 'App',
  components: {
    Navbar
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
</style>
