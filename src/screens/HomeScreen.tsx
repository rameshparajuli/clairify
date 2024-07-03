import React from "react";
import { View, Text, Image } from "react-native";
import { useAppSelector } from "../redux/hooks";

const HomeScreen = () => {
  const { isLoading, error: authError } = useAppSelector((state) => state.auth);

  const user = useAppSelector((state) => state.user.information);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (authError) {
    return <Text>{authError.message}</Text>;
  }

  if (!user?.name) {
    return <Text>No user data available.</Text>;
  }

  return (
    <View className="flex-1 justify-center items-center">
      <Image
        source={{ uri: user?.picture }}
        className="w-24 h-24 rounded-full"
      />
      <Text className="text-xl mt-4">Name: {user?.name}</Text>
      <Text className="text-lg mt-2">Email: {user?.email}</Text>
    </View>
  );
};

export default HomeScreen;
