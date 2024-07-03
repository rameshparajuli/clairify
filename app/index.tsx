import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import Colors from "../src/theme/colors";

export default function index() {
  return (
    <View className="flex-1 justify-center align-middle">
      <ActivityIndicator size={"large"} color={Colors.app_color} />
    </View>
  );
}
