import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "../features/counter/counterSlice";
import tasksSlice from "../features/tasks/tasksSlice";
import userSlice from "../features/user/userSlice";
export const store = configureStore({
  reducer: {
    counter: counterSlice,
    user: userSlice,
    tasks: tasksSlice,
  },
});