import React from "react";
import { View, ActivityIndicator } from "react-native";
import Colors from "../theme/colors";

const SplashScreen: React.FC = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <ActivityIndicator size="large" color={Colors.app_color} />
    </View>
  );
};

export default SplashScreen;
