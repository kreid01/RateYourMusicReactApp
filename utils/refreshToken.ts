import * as SecureStore from "expo-secure-store";

export const resetAccessToken = async () => {
  await SecureStore.deleteItemAsync("token");
};

export const setRefreshToken = async (token: string) => {
  await SecureStore.setItemAsync("token", JSON.stringify(token));
};

export const getRefreshToken = async () => {
  try {
    const value = await SecureStore.getItemAsync("token");
    if (value) {
      return await JSON.parse(value);
    }
  } catch (error) {
    return null;
  }
};
