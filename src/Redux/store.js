import { configureStore } from "@reduxjs/toolkit";
import historyReducer from "./Reducer/historySlice"; 
import favouriteReducer from "../features/favourite/favouriteSlice"; 
import authSlice from "./Reducer/authSlice";


export const store = configureStore({
  reducer: {
    auth: authSlice,
    history: historyReducer,
    favourite: favouriteReducer,
   },
});