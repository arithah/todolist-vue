<template>
    <div class="show-todo container">
      <ul class="todo">
          <li v-for="(todo, index) in todoList" :key="todo.id">
            <div @click="todoClick(todo, index)" v-if="todo.status=='inprogress'">
              <i class="material-icons checkbox">check_box_outline_blank</i>
              <span class="progress-todo">{{ todo.displayName }}</span>
            </div>
          </li>
      </ul>
      <h5 class="center">- Completed -</h5>
      <ul class="todo">
            <li v-for="(todo, index) in todoList" :key="todo.id">
              <div @click="todoClick(todo, index)" v-if="todo.status=='completed'">
                <i class="material-icons checkbox">check_box</i>
                <span class="progress-todo">{{ todo.displayName }}</span>
              </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  name: 'ShowTodo',
  data () {
    return {
      todoList: [
        { id: '1', displayName: 'Call Home', status: 'completed' },
        { id: '2', displayName: 'Get Groceries', status: 'inprogress' },
        { id: '3', displayName: 'Wash Car', status: 'inprogress' }
      ]
    }
  },
  methods: {
    todoClick (todo, index) {
      this.todoList[index].status = todo.status === 'inprogress' ? 'completed' : 'inprogress'
    }
  }
}
</script>

<style>
  .show-todo {
    width: 200px;
    padding: 0px 25px;
  }
  .show-todo .todo {
    text-align: left;
  }
  .show-todo .todo li {
    display: inline-block;
  }
 .show-todo .todo .checkbox {
   font-size: 18px;
   color: #3700B3;
 }
</style>
