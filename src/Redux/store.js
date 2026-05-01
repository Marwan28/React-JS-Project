import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Reducer/userReducer";
import historyReducer from "./Reducer/historySlice"; // من main
import favouriteReducer from "../features/favourite/favouriteSlice"; // بتاعك

export const store = configureStore({
  reducer: {
    user: userReducer,
    history: historyReducer,
    favourite: favouriteReducer,
   },
});