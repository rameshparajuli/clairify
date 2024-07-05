import * as Google from "expo-auth-session/providers/google";

// if process is not working:

const EXPO_CLIENT_ID_WEB =
  "108956936509-6pr4o98l1ln5e7jugbepa83388gfq128.apps.googleusercontent.com";
const EXPO_CLIENT_ID_IOS =
  "108956936509-8m7mpsvm5o4pj9e14dc5pa9sjve7eka9.apps.googleusercontent.com";
const EXPO_CLIENT_ID_ANDROID =
  "108956936509-gan4atv7i0vrkfu27p6p7n74j2ve9ltr.apps.googleusercontent.com";
export const userRequest: Partial<Google.GoogleAuthRequestConfig> | undefined =
  {
    androidClientId:
      process.env.EXPO_CLIENT_ID_ANDROID ?? EXPO_CLIENT_ID_ANDROID,
    iosClientId: process.env.EXPO_CLIENT_ID_IOS ?? EXPO_CLIENT_ID_IOS,
    webClientId: process.env.EXPO_CLIENT_ID_WEB ?? EXPO_CLIENT_ID_WEB,
  };

export interface AuthReq {
  token: string;
}
