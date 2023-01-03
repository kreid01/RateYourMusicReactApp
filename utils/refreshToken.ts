import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

export const resetAccessToken = async () => {
  Platform.OS === "ios" ? await SecureStore.deleteItemAsync("token") : null;
};

export const setRefreshToken = async (token: string) => {
  Platform.OS === "ios"
    ? await SecureStore.setItemAsync("token", JSON.stringify(token))
    : null;
};

export const getRefreshToken = async () => {
  try {
    const value =
      Platform.OS === "ios" ? await SecureStore.getItemAsync("token") : null;
    if (value) {
      console.debug(value);
      return await JSON.parse(value);
    }
  } catch (error) {
    return null;
  }
};
