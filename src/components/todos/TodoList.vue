<template>
  <div class="todo-list">
    <div class="desktop hide-on-med-and-down">
      <p v-if="showEmptyMessage()" class="grey-text">{{ emptyMessage }}</p>
      <div class="todo">
        <p v-for="(todo, index) in todoList" :key="todo.id">
          <label v-if="status === todo.status">
            <input type="checkbox" @click="todoClick(todo, index)" class="filled-in" :checked="todo.status === 'completed' ? 'checked' : ''"/>
            <span :class="todo.status">{{ todo.displayName }}</span>
          </label>
        </p>
      </div>
    </div>
    <div class="mobile hide-on-large-only">
      <p v-if="showEmptyMessage()" class="grey-text">{{ emptyMessage }}</p>
      <div class="todo">
        <p v-for="(todo, index) in todoList" :key="todo.id">
          <label v-if="status === todo.status">
            <input type="checkbox" @click="todoClick(todo, index)" class="filled-in" :checked="checkStatus(todo)"/>
            <span :class="todo.status">
              <div @click.prevent="expandTodo(todo, index)">
                {{ todo.displayName }}
              </div>
            </span>
            <div v-if="expandedTodo === index"  class="expanded">
              <textarea name="comments" id="" cols="30" rows="10" placeholder="Comments - coming soon" disabled="true" ></textarea>
              <div v-if="$router.currentRoute.path !== '/deleted'">
                <i class="material-icons delete right" @click.prevent="deleteTodo(todo, index)">delete</i>
                <i class="material-icons edit right" @click.prevent="editTodo(todo)">edit</i>
              </div>
              <div v-if="$router.currentRoute.path === '/deleted'">
                <i class="material-icons delete right" @click.prevent="undoDelete(todo, index)">delete_forever</i>
              </div>
            </div>
          </label>
        </p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'TodoList',
  data () {
    return {
      expandedTodo: null
    }
  },
  props: [ 'todoList', 'status', 'emptyMessage' ],
  watch: {
    '$route' (to, from) {
      if (to !== from) {
        this.expandedTodo = null
      }
    }
  },
  methods: {
    todoClick (todo, index) {
      const status = todo.status === 'inprogress' ? 'completed' : 'inprogress'
      this.$emit('handleTodo', { todo, index, status, prevStatus: todo.status })
    },
    deleteTodo (todo, index) {
      this.$emit('handleTodo', { todo, index, status: 'deleted', prevStatus: todo.status })
    },
    undoDelete (todo, index) {
      this.$emit('handleTodo', { todo, index, status: todo.prevStatus, prevStatus: 'deleted' })
    },
    editTodo (todo) {
      this.$router.push({name: 'EditTodo', params: { todo }})
    },
    checkStatus (todo) {
      if (todo.status === 'deleted') {
        return todo.prevStatus === 'completed' ? 'checked' : ''
      } else {
        return todo.status === 'completed' ? 'checked' : ''
      }
    },
    expandTodo (todo, index) {
      if (this.expandedTodo === index) {
        this.expandedTodo = null
      } else {
        this.expandedTodo = index
      }
    },
    showEmptyMessage () {
      const list = this.todoList.filter(todo => {
        return todo.status === this.status
      })
      if (list.length > 0) {
        return false
      }
      return true
    }
  }
}
</script>

<style>
  .heading {
    padding-bottom: 25px;
  }
  .todo-list .desktop .todo p {
    text-align: left;
  }
  .todo-list .todo .completed {
    text-decoration-line: line-through;
  }
  .todo-list .desktop .todo .edit {
    margin: 0px 2px;
    cursor: pointer;
  }
  .todo-list .todo .delete {
    margin: 0px 2px;
    cursor: pointer;
  }
  .todo-list .todo .expanded {
    height: 75px;
    padding-left: 35px;
  }
  .todo-list .todo .expanded textarea {
    border: none;
    font-size: 12px;
  }

  /* @media only screen and (max-width: 600px) {
    .todo-list .todo p label span {
      width: 230px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  } */
</style>
