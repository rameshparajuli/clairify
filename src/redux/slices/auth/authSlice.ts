import { createSlice, PayloadAction, SerializedError } from "@reduxjs/toolkit";

import {
  deleteSecureItem,
  deleteStorage,
  saveSecureItem,
} from "../../../utils/secureStorage";

import { authLogin } from "./authAction";
import { AUTH_TOKEN_KEY, USER_DETAILS } from "../../../constants";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error?: SerializedError;
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      saveSecureItem(AUTH_TOKEN_KEY, action.payload.token);
    },
    clearToken: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.error = undefined;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authLogin.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = true;
      })
      .addCase(authLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.error;
      });
  },
});

export const { setToken, clearToken } = authSlice.actions;

export default authSlice;
