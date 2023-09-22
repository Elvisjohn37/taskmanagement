import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./../Pages/login/slice";
import appRouteReducer from "./../Pages/approute/slice";
import taskListReducer from "./../components/tasklist/slice";

let store = configureStore({
  reducer: {
    user: userReducer,
    appRoute: appRouteReducer,
    taskList: taskListReducer,
  },
});

export default store;
