import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Reducer/userReducer";
import historyReducer from "./Reducer/historySlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    history: historyReducer,

  },
});
