import { createAsyncThunk } from "@reduxjs/toolkit";

import userSlice from "../user/userSlice";
import Axios from "axios";
import { AuthReq } from "../../../models/auth.model";
import { User } from "../../../models/user.model";

export const authLogin = createAsyncThunk<
  User,
  AuthReq,
  { rejectValue: string }
>("authLogin", async ({ token }, { dispatch, rejectWithValue }) => {
  try {
    const AuthApi = Axios.create({
      baseURL: "https://www.googleapis.com",
      timeout: 10000,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const response = await AuthApi.get("/userinfo/v2/me");

    console.log("response is", JSON.stringify(response));

    dispatch(
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
    console.error("Failed to fetch user info:", error);
    return rejectWithValue("Failed to fetch user info");
  }
});
