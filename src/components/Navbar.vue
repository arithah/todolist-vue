<template>
    <nav class="nav-wrapper deep-purple accent-4">
        <router-link :to="{ name: 'TodayList' }">
            <span class="brand-logo center">Todo List</span>
        </router-link>
        <ul class="right">
            <li>
                <router-link :to="{ name: 'CompletedTodo' }">
                    <span>Compeleted</span>
                </router-link>
            </li>
            <li>
                <router-link to="">
                    <span>Logout</span>
                </router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {}
  }
}
</script>

<style>
    .nav-wrapper {
        padding: 0 20px;
    }
</style>
