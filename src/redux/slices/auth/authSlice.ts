import { createSlice, PayloadAction, SerializedError } from "@reduxjs/toolkit";
import { AuthResponse } from "../../../models/auth.model";

import { deleteSecureItem, saveSecureItem } from "../../../utils/secureStorage";

import { authLogin } from "./authAction";
import { AUTH_TOKEN_KEY } from "../../../constants";

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
    setToken: (state, action: PayloadAction<AuthResponse>) => {
      state.token = action.payload.auth_token;
      state.isAuthenticated = true;
      saveSecureItem(AUTH_TOKEN_KEY, action.payload.auth_token);
    },
    clearToken: (state) => {
      state = initialState;
      deleteSecureItem(AUTH_TOKEN_KEY);
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
