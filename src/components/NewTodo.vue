<template>
    <div class="input-field add-todo">
        <i class="material-icons prefix">mode_edit</i>
        <input type="text" id="add-todo" class="validate" @keydown.tab.prevent="AddToDo" v-model="newToDo">
        <label for="add-todo">Add a To Do</label>
        <span class="error-text" data-error="wrong" data-success="right">{{ message }}</span>
    </div>
</template>

<script>
export default {
  name: 'NewTodo',
  data () {
    return {
      message: null,
      newToDo: null
    }
  },
  methods: {
    AddToDo () {
    }
  }
}
</script>

<style>

</style>
