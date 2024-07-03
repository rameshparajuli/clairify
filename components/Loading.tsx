import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import Colors from "../app/theme/colors";

export default function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={"large"} color={Colors.app_color} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
