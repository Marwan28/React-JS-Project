import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  listings: [],
  currentListing: null,
  loading: false,
  error: null,
};

const listingSlice = createSlice({
  name: 'listing',
  initialState,
  reducers: {
    fetchListingsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchListingsSuccess: (state, action) => {
      state.loading = false;
      state.listings = action.payload;
    },
    fetchListingsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setCurrentListing: (state, action) => {
      state.currentListing = action.payload;
    },
    clearListings: (state) => {
      state.listings = [];
      state.currentListing = null;
    },
    addListing: (state, action) => {
      state.listings.push(action.payload);
    },
    updateListing: (state, action) => {
      const index = state.listings.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.listings[index] = action.payload;
      }
    },
    deleteListing: (state, action) => {
      state.listings = state.listings.filter(
        (item) => item.id !== action.payload
      );
    },
    clearListingError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchListingsStart,
  fetchListingsSuccess,
  fetchListingsFailure,
  setCurrentListing,
  clearListings,
  addListing,
  updateListing,
  deleteListing,
  clearListingError,
} = listingSlice.actions;

export default listingSlice.reducer;
