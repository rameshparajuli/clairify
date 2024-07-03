import { createAsyncThunk, AsyncThunkPayloadCreator } from "@reduxjs/toolkit";

import userSlice from "../user/userSlice";
import Axios from "axios";
import { AuthReq } from "../../../models/auth.model";
import { User } from "../../../models/user.model";
import { AUTH_URL } from "@/constants";

export const authLogin = createAsyncThunk<User, AuthReq>(
  "authLogin",
  async (obj, api) => {
    try {
      const AuthApi = Axios.create({
        baseURL: process.env.EXPO_PUBLIC_API_URL,
        timeout: 10000,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${obj.token}`,
        },
      });

      const response = await AuthApi.get(AUTH_URL);

      api.dispatch(
        userSlice.actions.setUser({
          email: response.data.email,
          family_name: response.data.family_name,
          given_name: response.data.given_name,
          id: response.data.id,
          name: response.data.name,
          picture: response.data.picture,
          verified_email: response.data.verified_email,
        })
      );

      return response;
    } catch (error) {
      return api.rejectWithValue("Failed to fetch user info");
    }
  }
);
