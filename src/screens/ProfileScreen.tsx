import React, { useState } from "react";
import { View, Button, ActivityIndicator } from "react-native";

import { useAppDispatch } from "../redux/hooks";
import { authActions, userActions } from "../redux/actions";
import Colors from "../theme/colors";

const ProfileScreen = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      dispatch(authActions.clearToken());
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
