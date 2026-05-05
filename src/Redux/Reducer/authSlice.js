import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../config/supabaseClient";

const getStorageUser = (user, profile = {}) => {
  const metadata = user.user_metadata || {};
  const userType = metadata.type || metadata.role || profile.type || profile.role || "user";

  return {
    id: user.id,
    email: profile.email || user.email,
    name: profile.name || profile.full_name || metadata.full_name || metadata.name || "",
    avatar: profile.avatar || profile.avatar_url || metadata.avatar_url || "",
    phone: profile.phone || metadata.phone || "",
    location: profile.location || metadata.location || "",
    type: userType,
    role: userType,
  };
};

const getUserProfile = async (userId) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    console.error("Profile load error:", error.message);
    return {};
  }

  return data || {};
};

const saveUserSession = (user, token, profile) => {
  sessionStorage.setItem("token", token);
  sessionStorage.setItem("userId", user.id);
  sessionStorage.setItem("user", JSON.stringify(getStorageUser(user, profile)));
};

const saveToStorage = (user, token, rememberMe, profile) => {
  const storage = rememberMe ? localStorage : sessionStorage;
  storage.setItem("token", token);
  storage.setItem("userId", user.id);
  storage.setItem("user", JSON.stringify(getStorageUser(user, profile)));
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
  loading: !!getSavedToken(),
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

    const profile = await getUserProfile(data.user.id);

    return { user: data.user, token: data.session.access_token, rememberMe, profile };
  },
);

export const restoreAuthFromToken = createAsyncThunk(
  "auth/restoreAuthFromToken",
  async (_, { rejectWithValue }) => {
    const token = getSavedToken();

    if (!token) {
      return null;
    }

    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      clearStorage();
      return rejectWithValue(error?.message || "Invalid saved token");
    }

    const profile = await getUserProfile(data.user.id);

    saveUserSession(data.user, token, profile);

    return { user: data.user, token, profile };
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
        const { user, token, rememberMe, profile } = action.payload;

        state.loading = false;
        state.isLoggedIn = true;
        state.error = null;
        state.token = token;
        state.user = getStorageUser(user, profile);
        state.storageSource = rememberMe
          ? "localStorage 🟢 (Remember Me)"
          : "sessionStorage 🔵 (Session Only)";

        saveToStorage(user, token, rememberMe, profile);
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
      .addCase(restoreAuthFromToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(restoreAuthFromToken.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        if (!action.payload) {
          state.isLoggedIn = false;
          state.user = null;
          state.token = null;
          state.storageSource = "not stored ❌";
          return;
        }

        const { user, token, profile } = action.payload;

        state.user = getStorageUser(user, profile);
        state.isLoggedIn = true;
        state.token = token;
        state.storageSource = "sessionStorage 🔵 (Session Restored)";
      })
      .addCase(restoreAuthFromToken.rejected, (state) => {
        state.user = null;
        state.isLoggedIn = false;
        state.loading = false;
        state.error = null;
        state.token = null;
        state.storageSource = "not stored ❌";
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
