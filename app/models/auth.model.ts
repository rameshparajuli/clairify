import * as Google from "expo-auth-session/providers/google";
export const userRequest: Partial<Google.GoogleAuthRequestConfig> | undefined =
  {
    androidClientId: process.env.EXPO_CLIENT_ID_ANDROID,
    iosClientId: process.env.EXPO_CLIENT_ID_IOS,
    webClientId: process.env.EXPO_CLIENT_ID_WEB,
  };

export interface AuthReq {
  token: string;
}
