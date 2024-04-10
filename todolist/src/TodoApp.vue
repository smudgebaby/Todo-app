
<template>
  <div class="app container mt-5">
    <h1 class="text-center mb-3">Todos</h1>
    <div class="input-group mb-3">
      <input
        v-model="newTodoValue"
        @keyup.enter="addTodo"
        placeholder="Type a todo and hit Enter"
        class="form-control"
      />

      <input type="date" v-model="newTodoDueDate" class="form-control">
      <div class="input-group-append">
        <button class="btn btn-outline-secondary" @click="addTodo">Add</button>
      </div>
    </div>

    <div class="d-flex justify-content-between mb-3">
      <select v-model="todosStore.filter" class="form-control w-auto mr-2">
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>

      <select v-model="sortOrder" class="form-control w-auto mr-2">
      <option value="priority">Sort by Priority</option>
      <option value="done">Sort by Status</option>
    </select>
      <button @click="todosStore.clearCompleted" class="btn btn-primary">Clear Completed</button>
    </div>

    <div class="input-group mb-3">
      <label> Search Todos:
      <input
        v-model="todosStore.searchQuery"
        placeholder="Search todos"
        class="form-control"
      />
      </label>
    </div>

    <ul class="list-group">
      <li v-for="todo in todosStore.filteredTodos" :key="todo.id" class="list-group-item d-flex align-items-center">
        <input type="checkbox" v-model="todo.done" class="mr-2">
        <template v-if="todo.isEditing">
          <input
            class="form-control"
            v-model="todo.value"
            @blur="finishEdit(todo)"
            @keyup.enter="finishEdit(todo)"
          >
        </template>
        <template v-else>
          <span @dblclick="startEdit(todo)" class="flex-grow-1">{{ todo.value }}</span>
        </template>

        <label  v-if="todo.dueDate" class="text-muted medium mr-2">Due date: <span class="ml-auto">{{ todo.dueDate }}</span></label>
        <select v-model="todo.priority" @change="() => todosStore.setPriority(todo.id, todo.priority)" class="form-control w-auto mr-2">
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <button @click="() => todosStore.removeTodo(todo.id)" class="btn btn-sm btn-outline-primary">Remove</button>
      </li>
    </ul>

  </div>
</template>

<script>
import { ref, watch } from 'vue';
import { useTodosStore } from './store/todos';

export default {
  name: 'App',
  setup() {
    const todosStore = useTodosStore();
    const newTodoValue = ref('');
    const sortOrder = ref('priority');
    const newTodoDueDate = ref('');

    const addTodo = () => {
      if (newTodoValue.value.trim() !== '') {
        todosStore.addTodo({value: newTodoValue.value, dueDate: newTodoDueDate.value});
        newTodoValue.value = '';
      }
    };

    const startEdit = (todo) => {
      todo.isEditing = true;
    };

    const finishEdit = (todo) => {
      todosStore.editTodo(todo.id, todo.value);
      todo.isEditing = false;
    };

    const sortTodos = () => {
      todosStore.sortTodos(sortOrder.value);
    };

    watch(sortOrder, sortTodos); 


    return {
      newTodoValue,
      newTodoDueDate,
      sortOrder,
      addTodo,
      startEdit,
      finishEdit,
      todosStore
    };
  },
};
</script>
