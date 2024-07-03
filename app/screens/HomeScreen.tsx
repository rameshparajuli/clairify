import React from "react";
import { View, Text, Image } from "react-native";
import { useAppSelector } from "../redux/hooks";

const HomeScreen = () => {
  const { isLoading, error: authError } = useAppSelector((state) => state.auth);

  const user = useAppSelector((state) => state.user.information);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Loading...</Text>;
      </View>
    );
  }

  if (authError) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>{authError.message}</Text>
      </View>
    );
  }

  if (!user?.name) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>No user data available.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center items-center">
      <Image
        source={{ uri: user?.picture }}
        className="w-24 h-24 rounded-full"
      />
      <Text className="text-xl mt-4">
        Name: {`${user?.given_name} ${user?.family_name}`}
      </Text>
      <Text className="text-lg mt-2">Email: {user?.email}</Text>
    </View>
  );
};

export default HomeScreen;
