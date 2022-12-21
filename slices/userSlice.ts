import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUser {
  value: {
    id: number | null;
    username: string | null;
  } | null;
}

export type User = {
  id: number | null;
  username: string | null;
};

export const initialState: IUser = {
  value: {
    id: null,
    username: null,
  },
};

export const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.value = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
