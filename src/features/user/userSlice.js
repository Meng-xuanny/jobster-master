import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import {
  addUserToLocalStorage,
  getUserToLocalStorage,
  removeUserToLocalStorage,
} from "../../utils/localStorage";
import {
  loginThunk,
  registerThunk,
  updateThunk,
  clearThunk,
} from "./userThunk";

const initialState = {
  isLoading: false,
  isSidebarOpen: false,
  user: getUserToLocalStorage(),
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => registerThunk("/auth/register", user, thunkAPI)
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => loginThunk("/auth/login", user, thunkAPI)
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (user, thunkAPI) => updateThunk("/auth/updateUser", user, thunkAPI)
);

export const clearStore = createAsyncThunk("user/clearStore", clearThunk);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    logoutUser: (state, { payload }) => {
      state.isSidebarOpen = false;
      state.user = null;
      removeUserToLocalStorage();
      if (payload) {
        toast.success(payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        addUserToLocalStorage(user);
        state.user = user;
        state.isLoading = false;
        toast.success(`Hello, ${user.name}`);
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        addUserToLocalStorage(user);
        state.user = user;
        state.isLoading = false;
        toast.success(`Welcome back, ${user.name}`);
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        addUserToLocalStorage(user);
        state.user = user;
        state.isLoading = false;
        toast.success(`User Updated!`);
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(clearStore.rejected, () => {
        toast.error("There was an error");
      });
  },
});

export const { toggleSidebar, logoutUser } = userSlice.actions;
export default userSlice.reducer;
