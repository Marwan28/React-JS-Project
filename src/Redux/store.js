import { configureStore } from "@reduxjs/toolkit";
import historyReducer from "./Reducer/historySlice"; 
import favouriteReducer from "../features/favourite/favouriteSlice"; 
import authSlice from "./Reducer/authSlice";
import signUpReducer from "../features/signUp/signUpSlice";


export const store = configureStore({
  reducer: {
    auth: authSlice,
    signUp: signUpReducer,
    history: historyReducer,
    favourite: favouriteReducer,
   },
});
