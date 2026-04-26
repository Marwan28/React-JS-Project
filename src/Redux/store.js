import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Reducer/userReducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
