import React, { useState } from "react";
import { View, Button, ActivityIndicator, StyleSheet } from "react-native";

import { useAppDispatch } from "../redux/hooks";
import { authActions, userActions } from "../redux/actions";
import Colors from "../theme/colors";

const SettingScreen = () => {
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
    <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SettingScreen;
