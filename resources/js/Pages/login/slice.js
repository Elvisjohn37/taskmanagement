import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoginStatus: (state, action) => {
      state.isLogin = action.payload?.isLogin;
    },
    setUserStatus: (state, action) => {
      state.isLogin = action.payload?.isLogin;
    },
    deleteUserLogin: (state) => {
      state = { isLogin: false };
    },
  },
});

const getUserState = (state) => state.user;

export const { setLoginStatus, setUserStatus, deleteUserLogin } =
  userSlice.actions;

export default userSlice.reducer;

export { getUserState };
