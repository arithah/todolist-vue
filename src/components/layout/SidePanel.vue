<template>
  <div class="side-panel">
    <div class="collection">
      <a href="#" class="collection-item">
        <span class="badge">12</span>
        <i class="material-icons">inbox</i>
        <router-link :to="{ name: 'TodayList' }">Inbox</router-link>
      </a>
      <a href="#" class="collection-item">
        <i class="material-icons">check</i>
        <router-link :to="{ name: 'TodayList' }">Completed</router-link>
      </a>
      <a href="#" class="collection-item">
        <i class="material-icons">delete</i>
        <router-link :to="{ name: 'TodayList' }">Trash</router-link>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SidePanel',
  data () {
    return {}
  }
}
</script>

<style>

</style>
