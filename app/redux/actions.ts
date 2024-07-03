import * as authLoginActions from "./slices/auth/authAction";
import authSlice from "./slices/auth/authSlice";

import userDetailsSlice from "./slices/user/userSlice";

export const authActions = {
  ...authSlice.actions,
  ...authLoginActions,
};

export const userActions = {
  ...userDetailsSlice.actions,
};
