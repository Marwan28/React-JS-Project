import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../config/supabaseClient";

const saveToStorage = (user, token, rememberMe) => {
  const storage = rememberMe ? localStorage : sessionStorage;
  storage.setItem("token", token);
  storage.setItem("userId", user.id);
  storage.setItem(
    "user",
    JSON.stringify({
      id: user.id,
      email: user.email,
      name: user.user_metadata?.full_name || "",
      avatar: user.user_metadata?.avatar_url || "",
    }),
  );
};
const getSavedToken = () =>
  localStorage.getItem("token") || sessionStorage.getItem("token") || null;

const getSavedUser = () => {
  try {
    const user = localStorage.getItem("user") || sessionStorage.getItem("user"); // ✅
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

const clearStorage = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("user");
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("userId");
  sessionStorage.removeItem("user");
};

const initialState = {
  user: getSavedUser(),
  isLoggedIn: !!getSavedToken(),
  loading: false,
  error: null,
  storageSource: localStorage.getItem("user")
    ? "localStorage 🟢 (Remember Me)"
    : sessionStorage.getItem("user")
      ? "sessionStorage 🔵 (Session Only)"
      : "not stored ❌",
  token: getSavedToken(),
};
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password, rememberMe }, { rejectWithValue }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return rejectWithValue(error.message);
    }

    return { user: data.user, token: data.session.access_token, rememberMe };
  },
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return rejectWithValue(error.message);
    }

    clearStorage();
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        const { user, token, rememberMe } = action.payload;

        state.loading = false;
        state.isLoggedIn = true;
        state.error = null;
        state.token = token;
        state.user = {
          id: user.id,
          email: user.email,
          name: user.user_metadata?.full_name || "",
          avatar: user.user_metadata?.avatar_url || "",
        };
        state.storageSource = rememberMe
          ? "localStorage 🟢 (Remember Me)"
          : "sessionStorage 🔵 (Session Only)";

        saveToStorage(user, token, rememberMe);
        console.log(action.payload);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedIn = false;

        // state.error = action.payload;
        state.error = action.payload;
        console.log("error: " + state.error);
        console.log("error: " + action.payload);
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isLoggedIn = false;
        state.loading = false;
        state.error = null;
        state.token = null;
        state.storageSource = "not stored ❌";
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
