import React, { useEffect, useState, ReactNode } from "react";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getValueFor } from "../utils/secureStorage";
import { setToken } from "../redux/slices/auth/authSlice";
import SplashScreen from "../screens/SplashScreen";

const SetupConfig = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = await getValueFor("userToken");
      if (token) {
        dispatch(setToken(token));
        navigation.navigate("Home");
      } else {
        navigation.navigate("Login");
      }
      setIsLoading(false);
    };

    checkAuthStatus();
  }, [dispatch, navigation]);

  if (isLoading) {
    return <SplashScreen />;
  }

  return <>{children}</>;
};

export const AppConfiguration = React.memo(function AppConfiguration({
  children,
}: React.PropsWithChildren<unknown>) {
  return <SetupConfig>{children}</SetupConfig>;
});

export default AppConfiguration;
