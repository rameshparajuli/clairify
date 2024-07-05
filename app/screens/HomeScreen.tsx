import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useAppSelector } from "../redux/hooks";

const HomeScreen = () => {
  const { isLoading, error: authError } = useAppSelector((state) => state.auth);

  const user = useAppSelector((state) => state.user.information);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>;
      </View>
    );
  }

  if (authError) {
    return (
      <View style={styles.container}>
        <Text>{authError.message}</Text>
      </View>
    );
  }

  if (!user?.name) {
    return (
      <View style={styles.container}>
        <Text>No user data available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image style={styles.imageContainer} source={{ uri: user?.picture }} />
      <Text className="text-xl mt-4">
        Name: {`${user?.given_name} ${user?.family_name}`}
      </Text>
      <Text className="text-lg mt-2">Email: {user?.email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    height: 75,
    width: 75,
    borderRadius: 35,
  },
});

export default HomeScreen;
