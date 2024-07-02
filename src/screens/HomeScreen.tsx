import React, { useEffect } from "react";
import { View, Text, Image } from "react-native";
import { useAppSelector } from "../redux/hooks";
import { useGetUserQuery } from "../services/apiSlice";

const HomeScreen = () => {
  const { data: user, isLoading } = useGetUserQuery();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!user) {
    return <Text>No user data available.</Text>;
  }

  return (
    <View className="flex-1 justify-center items-center">
      <Image
        source={{ uri: user.picture }}
        className="w-24 h-24 rounded-full"
      />
      <Text className="text-xl mt-4">Name: {user.name}</Text>
      <Text className="text-lg mt-2">Email: {user.email}</Text>
      {/* Add other user details here if needed */}
    </View>
  );
};

export default HomeScreen;
