import { User } from "./user.model";

export interface AuthRequest {
  email: string;
}

export interface AuthResponse {
  message?: "";
  auth_token: string;
  data: User;
}
