<template>
  <div class="side-panel">
    <div class="collection hide-on-med-and-down">
        <router-link class="collection-item" :to="{ name: 'Home', params: { status: 'inprogress' }}">
          <span class="badge">12</span>
          <i class="material-icons">inbox</i>
          Inbox
        </router-link>
        <router-link class="collection-item" :to="{ name: 'Completed', params: { status: 'completed' }}">
          <i class="material-icons">check</i>
          Completed
        </router-link>
        <router-link class="collection-item" :to="{ name: 'Deleted', params: { status: 'deleted' }}">
          <i class="material-icons">delete</i>
          Deleted
        </router-link>
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
