import { createAsyncThunk } from "@reduxjs/toolkit";

import { api } from "../../../services/api";
import { AuthRequest, AuthResponse } from "../../../models/auth.model";
import userSlice from "../user/userSlice";

export const authLogin = createAsyncThunk<AuthResponse, AuthRequest>(
  "auth/authLogin",
  async (obj, { dispatch }) => {
    const requestObject = {
      email: `${obj.email}`,
    };

    const response = await api.post<AuthResponse>(
      "/google-signin",
      requestObject
    );

    const { message, data } = response.data;

    if (response?.status !== 200) {
      throw new Error(message);
    }

    if (response.status === 200) {
      dispatch(userSlice.actions.setUser(data));
    }

    return response.data;
  }
);
