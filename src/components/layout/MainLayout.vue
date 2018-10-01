<template>
  <div class="main-layout container row">
    <div class="col m4">
      <SidePanel />
    </div>
    <div class="col m8">
      <TodoContainer />
    </div>
  </div>
</template>

<script>

import SidePanel from '@/components/layout/SidePanel'
import TodoContainer from '@/components/todos/TodoContainer'

export default {
  name: 'MainLayout',
  components: {
    SidePanel,
    TodoContainer
  },
  data () {
    return {}
  }
}
</script>

<style>
  .fixed-action-btn {
    right: 0px;
    bottom: 45px;
  }
</style>
