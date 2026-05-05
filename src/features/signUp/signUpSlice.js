import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../../config/supabaseClient";

export const signUpUser = createAsyncThunk(
  "signUp/signUpUser",
  async ({ email, password, name, location, phone }, { rejectWithValue }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
          name,
          location,
          phone,
          role: "user",
        },
      },
    });

    if (error) {
      return rejectWithValue(error.message);
    }

    if (data.user?.identities?.length === 0) {
      return rejectWithValue(
        "This email is already registered. Please log in instead.",
      );
    }

    const userId = data.user?.id;

    if (!userId) {
      return rejectWithValue("Sign up failed. Please try again.");
    }

    const { error: profileError } = await supabase
      .from("profiles")
      .upsert(
        {
          id: userId,
          name,
          email,
          location,
          phone,
          role: "user",
        },
        { onConflict: "id" },
      );

    if (profileError) {
      return rejectWithValue(profileError.message);
    }

    return {
      user: data.user,
      session: data.session,
    };
  },
);


// export const signUpUser = createAsyncThunk(
//   "signUp/signUpUser",
//   async ({ email, password, name, location, phone }, { rejectWithValue }) => {
//     const { data, error } = await supabase.auth.signUp({
//       email,
//       password,
//       options: {
//         data: {
//           full_name: name,
//           name,
//           location,
//           phone,
//         },
//       },
//     });

//     if (error) {
//       return rejectWithValue(error.message);
//     }

//     if (data.user?.identities?.length === 0) {
//       return rejectWithValue(
//         "This email is already registered. Please log in instead.",
//       );
//     }

//     const userId = data.user?.id;

//     if (!userId) {
//       return rejectWithValue("Sign up failed. Please try again.");
//     }

//     const { error: profileError } = await supabase.from("profiles").insert({
//       id: userId,
//       name,
//       email,
//       location,
//       phone,
//     });

//     if (profileError) {
//       if (profileError.code === "23503" || profileError.code === "23505") {
//         return rejectWithValue(
//           "This email is already registered. Please log in instead.",
//         );
//       }

//       return rejectWithValue(profileError.message);
//     }

//     return {
//       user: data.user,
//       session: data.session,
//     };
//   },
// );

// export const signUpUser = createAsyncThunk(
//   "signUp/signUpUser",
//   async ({ email, password, name, location, phone }, { rejectWithValue }) => {
//     const { data, error } = await supabase.auth.signUp({
//       email,
//       password,
//       options: {
//         data: {
//           full_name: name,
//           name,
//           location,
//           phone,
//         },
//       },
//     });

//     if (error) {
//       return rejectWithValue(error.message);
//     }

//     if (data.user?.identities?.length === 0) {
//       return rejectWithValue(
//         "This email is already registered. Please log in instead.",
//       );
//     }

//     return {
//       user: data.user,
//       session: data.session,
//     };
//   },
// );



// export const signUpUser = createAsyncThunk(
//   "signUp/signUpUser",
//   async ({ email, password, name, location, phone }, { rejectWithValue }) => {
//     const { data, error } = await supabase.auth.signUp({
//       email,
//       password,
//       options: {
//         data: {
//           full_name: name,
//           name,
//           location,
//           phone,
//         },
//       },
//     });

//     if (error) {
//       return rejectWithValue(error.message);
//     }

//     const userId = data.user?.id;

//     if (!userId) {
//       return rejectWithValue("Sign up failed. Please try again.");
//     }

//     const { error: profileError } = await supabase.from("profiles").insert({
//       id: userId,
//       name,
//       email,
//       location,
//       phone,
//     });

//     if (profileError) {
//       return rejectWithValue(profileError.message);
//     }

//     return {
//       user: data.user,
//       session: data.session,
//     };
//   },
// );

const initialState = {
  loading: false,
  error: null,
  success: false,
};

const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {
    resetSignUpState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(signUpUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetSignUpState } = signUpSlice.actions;

export default signUpSlice.reducer;
