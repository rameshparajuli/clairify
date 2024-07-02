// note ::: no need to create this user for now but if we have to update profile
// it needs to implement

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../../models/user.model";
import { saveStorage, deleteStorage } from "../../../utils/secureStorage";
import { USER_DETAILS } from "../../../constants";

const initialState: User = {
  name: "",
  email: "",
  picture: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.picture = action.payload.picture;

      saveStorage(USER_DETAILS, action.payload);
    },
    clearUser: (state) => {
      state = initialState;
      deleteStorage(USER_DETAILS);
    },
  },
});

export default userSlice;
