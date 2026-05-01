import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Reducer/userReducer";
import favouriteReducer from "../features/favourite/favouriteSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    favourite: favouriteReducer,
  },
});