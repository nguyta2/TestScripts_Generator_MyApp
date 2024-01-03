import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../features/todos/todosSlice';
import userReducer from '../features/user/userSlice';

const store = configureStore({
  reducer: {
    todos: todosReducer,
    user: userReducer,
  },
});

export default store;