import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favourites: [],
  loading: false,
  error: null,
};

const favouriteSlice = createSlice({
  name: 'favourite',
  initialState,
  reducers: {
    fetchFavouritesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchFavouritesSuccess: (state, action) => {
      state.loading = false;
      state.favourites = action.payload;
    },
    fetchFavouritesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addFavourite: (state, action) => {
      state.favourites.push(action.payload);
    },
    removeFavourite: (state, action) => {
      state.favourites = state.favourites.filter(
        (item) => item.id !== action.payload
      );
    },
    clearFavourites: (state) => {
      state.favourites = [];
    },
    clearFavouriteError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchFavouritesStart,
  fetchFavouritesSuccess,
  fetchFavouritesFailure,
  addFavourite,
  removeFavourite,
  clearFavourites,
  clearFavouriteError,
} = favouriteSlice.actions;

export default favouriteSlice.reducer;
