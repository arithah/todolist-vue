<template>
  <div class="side-panel">
    <div class="collection hide-on-med-and-down">
        <router-link class="collection-item" :to="{ name: 'Home', params: { status: 'inprogress', title: 'Inbox' }}">
          <span class="badge">12</span>
          <i class="material-icons">inbox</i>
          Inbox
        </router-link>
        <router-link class="collection-item" :to="{ name: 'Home', params: { status: 'completed', title: 'Completed' }}">
          <i class="material-icons">check</i>
          Completed
        </router-link>
        <router-link class="collection-item" :to="{ name: 'Home', params: { status: 'deleted', title: 'Deleted' }}">
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
