<template>
  <div class="main-layout container row">
    <div class="col m4">
      <SidePanel />
    </div>
    <div class="col m8">
      <TodoContainer :status="getStatus()" :heading="heading" />
    </div>
  </div>
</template>

<script>

import SidePanel from '@/components/layout/SidePanel'
import TodoContainer from '@/components/todos/TodoContainer'

export default {
  name: 'Home',
  components: {
    SidePanel,
    TodoContainer
  },
  props: [ 'status' ],
  data () {
    return {
      heading: 'Inbox'
    }
  },
  watch: {
    '$route.params.title' (to, from) {
      if (to && to !== from) {
        this.heading = to
      }
    }
  },
  methods: {
    getStatus () {
      if (this.status) {
        return this.status
      }
      return 'inprogress'
    }
  }
}
</script>

<style>
  .fixed-action-btn {
    right: 0px;
    bottom: 45px;
  }
</style>
