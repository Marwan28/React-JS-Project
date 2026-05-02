import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../../config/supabaseClient";

const getCurrentUserId = (state) =>
  state.auth.user?.id ||
  localStorage.getItem("userId") ||
  sessionStorage.getItem("userId");

const getSavedToken = () =>
  localStorage.getItem("token") || sessionStorage.getItem("token");

const getUserIdFromToken = async () => {
  const token = getSavedToken();

  if (!token) {
    return null;
  }

  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user) {
    return null;
  }

  sessionStorage.setItem("userId", data.user.id);
  sessionStorage.setItem("token", token);

  return data.user.id;
};

const getPropertyId = (propertyOrId) =>
  typeof propertyOrId === "object" ? propertyOrId.id : propertyOrId;

export const loadFavouriteItems = createAsyncThunk(
  "favourite/loadFavouriteItems",
  async (_, { getState, rejectWithValue }) => {
    const userId = getCurrentUserId(getState()) || (await getUserIdFromToken());

    if (!userId) {
      return [];
    }

    const { data: favoriteRows, error: favoritesError } = await supabase
      .from("favorites")
      .select("property_id")
      .eq("user_id", userId);

    if (favoritesError) {
      return rejectWithValue(favoritesError.message);
    }

    const propertyIds = favoriteRows
      .map((favorite) => favorite.property_id)
      .filter(Boolean);

    if (!propertyIds.length) {
      return [];
    }

    const { data: properties, error: propertiesError } = await supabase
      .from("properties")
      .select("*")
      .in("id", propertyIds);

    if (propertiesError) {
      return rejectWithValue(propertiesError.message);
    }

    return properties || [];
  },
);

export const addToFavourite = createAsyncThunk(
  "favourite/addToFavourite",
  async (property, { getState, rejectWithValue }) => {
    const userId = getCurrentUserId(getState()) || (await getUserIdFromToken());

    if (!userId) {
      return rejectWithValue("Please sign in to save favorites.");
    }

    const { data: existingFavourite, error: checkError } = await supabase
      .from("favorites")
      .select("user_id,property_id")
      .eq("user_id", userId)
      .eq("property_id", property.id)
      .limit(1);

    if (checkError) {
      return rejectWithValue(checkError.message);
    }

    if (!existingFavourite?.length) {
      const { error } = await supabase.from("favorites").insert({
        user_id: userId,
        property_id: property.id,
      });

      if (error) {
        return rejectWithValue(error.message);
      }
    }

    return property;
  },
);

export const removeFromFavourite = createAsyncThunk(
  "favourite/removeFromFavourite",
  async (propertyOrId, { getState, rejectWithValue }) => {
    const userId = getCurrentUserId(getState()) || (await getUserIdFromToken());
    const propertyId = getPropertyId(propertyOrId);

    if (!userId) {
      return rejectWithValue("Please sign in to update favorites.");
    }

    const { error } = await supabase
      .from("favorites")
      .delete()
      .eq("user_id", userId)
      .eq("property_id", propertyId);

    if (error) {
      return rejectWithValue(error.message);
    }

    return propertyId;
  },
);

const favouriteSlice = createSlice({
  name: "favourite",
  initialState: {
    items: [],
    pendingIds: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadFavouriteItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadFavouriteItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(loadFavouriteItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addToFavourite.pending, (state, action) => {
        state.error = null;
        const propertyId = action.meta.arg.id;

        if (!state.pendingIds.includes(propertyId)) {
          state.pendingIds.push(propertyId);
        }
      })
      .addCase(addToFavourite.fulfilled, (state, action) => {
        state.pendingIds = state.pendingIds.filter(
          (id) => id !== action.payload.id,
        );

        const exists = state.items.find((item) => item.id === action.payload.id);

        if (!exists) {
          state.items.push(action.payload);
        }
      })
      .addCase(addToFavourite.rejected, (state, action) => {
        state.pendingIds = state.pendingIds.filter(
          (id) => id !== action.meta.arg.id,
        );
        state.error = action.payload;
      })
      .addCase(removeFromFavourite.pending, (state, action) => {
        state.error = null;
        const propertyId = getPropertyId(action.meta.arg);

        if (!state.pendingIds.includes(propertyId)) {
          state.pendingIds.push(propertyId);
        }
      })
      .addCase(removeFromFavourite.fulfilled, (state, action) => {
        state.pendingIds = state.pendingIds.filter(
          (id) => id !== action.payload,
        );
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(removeFromFavourite.rejected, (state, action) => {
        const propertyId = getPropertyId(action.meta.arg);

        state.pendingIds = state.pendingIds.filter((id) => id !== propertyId);
        state.error = action.payload;
      })
      .addCase("auth/logout/fulfilled", (state) => {
        state.items = [];
        state.pendingIds = [];
        state.loading = false;
        state.error = null;
      });
  },
});

export default favouriteSlice.reducer;
