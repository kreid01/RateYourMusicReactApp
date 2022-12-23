import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserQuery } from "../generated/graphql";
import { setUser, User } from "../slices/userSlice";
import { RootState } from "../store/store";
import { Text } from "native-base";
import { setAccessToken } from "../utils/accessToken";
import { setRefreshToken } from "../utils/refreshToken";

export const Login = () => {
  const dispatch = useDispatch();
  const [data] = useGetUserQuery();
  const currentUser = useSelector((state: RootState) => state.user.value);
  const { data: user } = data;

  const logout = async () => {
    await setRefreshToken("");
    setAccessToken("");
    dispatch(setUser(null));
  };

  useEffect(() => {
    dispatch(setUser(user?.getUser as User));
  }, [user]);

  return currentUser !== null && currentUser !== undefined ? (
    <Text onPress={() => logout()} className="text-white ml-3 mt-2">
      Logout
    </Text>
  ) : (
    <Text className="text-white ml-3 mt-2">Login</Text>
  );
};
