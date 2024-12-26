import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Todo {
  _id: string; // Changed 'id' to '_id'
  task: string;
  isCompleted: boolean;
}

interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [],
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos(state, action: PayloadAction<Todo[]>) {
      state.todos = action.payload;
    },
    addTodo(state, action: PayloadAction<Todo>) {
      state.todos.push(action.payload);
    },
    updateTodo(state, action: PayloadAction<{ _id: string; isCompleted: boolean }>) {
      // Changed 'id' to '_id'
      const todo = state.todos.find((t) => t._id === action.payload._id);
      if (todo) {
        todo.isCompleted = action.payload.isCompleted;
      }
    },
  },
});

export const { setTodos, addTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;
