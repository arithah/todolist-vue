<template>
  <div id="app">
    <h1>{{ title }}</h1>
  </div>
</template>

<script>

export default {
  name: 'app',
  data () {
    return {
      title: 'Todo List'
    }
  }
}
</script>

<style>
h1 {
  color: #444;
  font-weight: normal;
  text-align: center;
}
</style>
