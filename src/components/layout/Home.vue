<template>
  <div class="main-layout container row">
    <div class="col m4">
      <SidePanel />
    </div>
    <div class="col m8">
      <TodoContainer :status="getStatus()" :heading="getHeading()" />
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
    return {}
  },
  methods: {
    getStatus () {
      if (this.status) {
        return this.status
      }
      return 'inprogress'
    },
    getHeading () {
      if (this.status === 'completed') {
        return 'Completed'
      } else if (this.status === 'deleted') {
        return 'Deleted'
      }
      return 'Inbox'
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
