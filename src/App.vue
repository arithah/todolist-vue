<template>
  <div id="app">
    <Navbar />
    <div class="row">
      <div class="col s4">
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
