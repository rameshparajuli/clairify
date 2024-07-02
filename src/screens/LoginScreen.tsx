import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  Pressable,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import * as Google from "expo-auth-session/providers/google";

import { authActions } from "../redux/actions";

import { USER_DETAILS } from "../constants";
import {
  getStorage,
  getSecureItem,
  saveSecureItem,
  saveStorage,
  deleteSecureItem,
  deleteStorage,
} from "../utils/secureStorage";
import Colors from "../theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { useAppSelector } from "../redux/hooks";
import { AuthRequest } from "../models/auth.model";
import { AppDispatch } from "../redux/store";

const LoginScreen = () => {
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const [userInfo, setUserInfo] = useState(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "108956936509-r87c3hqm8n0fd060t32g95eq24t37p66.apps.googleusercontent.com",
    iosClientId:
      "108956936509-do44tqq2ntcbqec00eemgdj6g5jhovgl.apps.googleusercontent.com",
    webClientId:
      "108956936509-1ggpo7345qum00fu2o1k96o80lmi2a80.apps.googleusercontent.com",
  });

  useEffect(() => {
    handleSignInWithGoogle();
  }, [response]);

  const data = {
    auth_token: "token_success",
    data: {
      email: "rameshparajuli09@gmail.com",
      name: "Ramesh Parajuli",
      picture: "https://avatars.githubusercontent.com/u/27843187?v=4",
    },
  };

  const obj: AuthRequest = {
    email: "rameshparajuli09@gmail.com",
  };
  const dispatch: AppDispatch = useDispatch();

  const handleSignInWithGoogle = async () => {
    const userDetails = await getStorage(USER_DETAILS);

    if (!userDetails) {
      if (response?.type === "success") {
        await getUserInfo(response.authentication?.accessToken);
      }
    } else {
      await saveStorage(USER_DETAILS, JSON.parse(userDetails));
    }

    // promptAsync();
    // try {
    //   dispatch(authActions.authLogin(obj));
    // } catch (error) {
    //   console.error("signin error:", error);
    // } finally {
    // }
    // const user = await GoogleAuthentication.signIn(); // Example function to handle Google sign-in
    // if (user) {
    //   navigation.navigate("Home");
    // }
  };

  const getUserInfo = async (token: string | undefined) => {
    if (!token) return;

    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const userDetails = response.json();

      await await saveStorage(USER_DETAILS, userDetails);
    } catch (error) {
    } finally {
    }
  };

  const onPressTerms = () => {
    alert("terms and condition");
  };

  const onPressInformation = () => {
    alert("app information !");
  };

  const edgeInsets = useSafeAreaInsets();

  return (
    <ImageBackground
      style={[
        styles.container,
        {
          paddingTop: edgeInsets.top,
          paddingBottom: edgeInsets.bottom,
          paddingHorizontal: 25,
        },
      ]}
      source={require("../../assets/background.png")}
    >
      <View style={styles.flex}>
        <View style={{ flexDirection: "column", alignItems: "flex-end" }}>
          <Ionicons
            disabled={isLoading}
            onPress={onPressInformation}
            name="information-circle-outline"
            color={Colors.white}
            size={30}
          />
        </View>

        {/* todo:::: Logo's background is still messy, have to update in future */}
        <View style={styles.appTitle}>
          <Image
            resizeMethod="resize"
            resizeMode="contain"
            style={{
              height: Dimensions.get("screen").height * 0.2,
              width: Dimensions.get("screen").width * 0.5,
            }}
            source={require("../../assets/logo.png")}
          />
        </View>
      </View>

      <Pressable
        disabled={isLoading}
        onPress={() => promptAsync()}
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.2 : 1,
          },
          styles.googleButton,
        ]}
      >
        <View style={styles.googleLogoContainer}>
          <Image
            resizeMethod="resize"
            resizeMode="contain"
            style={{ height: 50, width: 50 }}
            source={require("../../assets/google.png")}
          />
        </View>
        <View style={styles.buttonTextContainer}>
          <Text numberOfLines={1} style={styles.continueGoogleText}>
            Continue with Google
          </Text>
        </View>
      </Pressable>

      <View style={styles.termsView}>
        <Pressable
          disabled={isLoading}
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.2 : 1,
            },
          ]}
          onPress={onPressTerms}
        >
          <Text style={styles.termsText}>Terms of use</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  appTitle: { flex: 1, justifyContent: "center", alignItems: "center" },
  container: { flex: 1 },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 7,
    paddingVertical: 20,
  },
  googleLogoContainer: { paddingHorizontal: 25, position: "absolute" },
  continueGoogleText: { fontSize: 16, color: Colors.black },
  buttonTextContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  termsView: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 30,
  },
  termsText: {
    textDecorationLine: "underline",
    fontSize: 14,
    color: Colors.white,
  },
});

export default LoginScreen;
