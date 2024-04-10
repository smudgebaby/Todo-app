
import { defineStore } from 'pinia';
import { nanoid } from 'nanoid';

export const useTodosStore = defineStore('todos', {
  state: () => ({
    todos: [],
    filter: 'all',
    searchQuery: ''
  }),
  actions: {
    addTodo({value, dueDate }) {
      this.todos.push({ id: nanoid(), value, done: false, priority: 'medium', isEditing: false, dueDate  });
    },
    removeTodo(id) {
      this.todos = this.todos.filter(todo => todo.id !== id);
    },
    toggleTodo(id) {
      const todo = this.todos.find(todo => todo.id === id);
      if (todo) {
        todo.done = !todo.done;
      }
    },
    editTodo(id, newValue) {
      const todo = this.todos.find(todo => todo.id === id);
      if (todo) {
        todo.value = newValue;
      }
    },
    setPriority(id, priority) {
      const todo = this.todos.find(todo => todo.id === id);
      if (todo) {
        todo.priority = priority;
      }
    },
    clearCompleted() {
      this.todos = this.todos.filter(todo => !todo.done);
    },
    sortTodos(by) {
      if (by === 'priority') {
        this.todos.sort((a, b) => ['high', 'medium', 'low'].indexOf(a.priority) - ['high', 'medium', 'low'].indexOf(b.priority));
      } else if (by === 'done') {
        this.todos.sort((a, b) => Number(b.done) - Number(a.done));
      }
    }
    
  },
  getters: {
    filteredTodos(state) {
      return state.todos
        .filter(todo => {
          if (state.filter === 'all') return true;
          return state.filter === 'completed' ? todo.done : !todo.done;
        })
        .filter(todo => todo.value.toLowerCase().includes(state.searchQuery.toLowerCase()));
    }
  }
});
