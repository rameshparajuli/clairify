import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function saveSecureItem(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

export async function getSecureItem(key: string) {
  return await SecureStore.getItemAsync(key);
}

export async function deleteSecureItem(key: string) {
  await SecureStore.deleteItemAsync(key);
}

export async function saveStorage(
  key: string,
  value: object | string | boolean | number | null | undefined
) {
  await AsyncStorage.setItem(key, prepareObject(value));
}

export async function getStorage(key: string) {
  return await AsyncStorage.getItem(key);
}

export async function deleteStorage(key: string) {
  await AsyncStorage.removeItem(key);
}
