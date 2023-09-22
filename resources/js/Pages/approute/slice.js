import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

const appRouteSlice = createSlice({
  name: "appRoute",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload?.isLoading;
    }
  },
});

const getAppRouteState = (state) => state.appRoute;

export const { setLoading } = appRouteSlice.actions;

export default appRouteSlice.reducer;

export { getAppRouteState };
