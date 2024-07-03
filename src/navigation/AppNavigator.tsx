import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/LoginScreen";
import HomeNavigator from "./HomeNavigator";
import { useAppSelector } from "../redux/hooks";
import Loading from "../components/Loading";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const userData = useAppSelector((state) => state.user.information);

  return (
    <NavigationContainer fallback={<Loading />}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated && !!userData ? (
          <Stack.Screen name="home_navigator" component={HomeNavigator} />
        ) : (
          <Stack.Screen name="login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
