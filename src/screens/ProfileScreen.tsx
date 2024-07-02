import React, { useState } from "react";
import { View, Text, Button, Switch, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch } from "../redux/hooks";
import { clearToken } from "../redux/slices/auth/authSlice";
import { deleteSecureItem } from "../utils/secureStorage";
import { AUTH_TOKEN_KEY } from "../constants";
import { api } from "../services/api";
import Colors from "../theme/colors";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      // Perform any necessary cleanup or API calls
      await deleteSecureItem(AUTH_TOKEN_KEY);
      dispatch(clearToken());
      // navigation.navigate("Login");
    } catch (error) {
      console.error("Logout error", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator size="large" color={Colors.app_color} />
      ) : (
        <>
          <Button title="Logout" onPress={handleLogout} />
        </>
      )}
    </View>
  );
};

export default ProfileScreen;
