// note ::: no need to create this user for now but if we have to update profile
// it needs to implement

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../../models/user.model";

interface UserProps {
  information?: User;
  isLoaded: boolean;
}

const initialState: UserProps = {
  isLoaded: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.information = action.payload;
      state.isLoaded = true;
    },
    clearUser: (state) => {
      state = initialState;
    },
  },
});

export default userSlice;
