// import * as AuthSession from "expo-auth-session";
// import * as SecureStore from "expo-secure-store";

// import Constants from "expo-constants";

// const googleClientId = Constants.manifest.extra.googleClientId;

// export async function signInWithGoogle() {
//   try {
//     const result = await AuthSession.startAsync({
//       authUrl: `https://accounts.google.com/o/oauth2/auth?client_id=${googleClientId}&redirect_uri=${AuthSession.makeRedirectUri(
//         { useProxy: true }
//       )}&response_type=token&scope=profile email`,
//     });

//     if (result.type === "success") {
//       await SecureStore.setItemAsync("googleToken", result.params.access_token);
//       return result.params.access_token;
//     }
//   } catch (error) {
//     console.error(error);
//   }
//   return null;
// }

// export async function getUserInfo(token: string) {
//   try {
//     const response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     return await response.json();
//   } catch (error) {
//     console.error(error);
//   }
//   return null;
// }
