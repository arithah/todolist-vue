<template>
  <div id="app">
    <Navbar />
    <div class="row">
      <div class="col m6 offset-m3">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style>
</style>
