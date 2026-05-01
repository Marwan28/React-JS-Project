import { createSlice } from "@reduxjs/toolkit";

const favouriteSlice = createSlice({
  name: "favourite",
  initialState: {
    items: [], 
   
  },
  reducers: {
    addToFavourite: (state, action) => {
      const exists = state.items.find((item) => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
      }
    },

    removeFromFavourite: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addToFavourite, removeFromFavourite } = favouriteSlice.actions;
export default favouriteSlice.reducer;