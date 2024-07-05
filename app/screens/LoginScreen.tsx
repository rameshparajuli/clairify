import React, { useEffect } from "react";
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
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";

import { authActions } from "../redux/actions";

import Colors from "../theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { useAppSelector } from "../redux/hooks";
import { AppDispatch } from "../redux/store";
import { userRequest } from "../models/auth.model";

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const [request, response, promptAsync] = Google.useAuthRequest(userRequest);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      __DEV__ && console.log("authentication", authentication);
      authentication?.accessToken &&
        dispatch(authActions.authLogin({ token: authentication?.accessToken }));
    }
    __DEV__ && console.log("authentication", response);
  }, [response]);

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
