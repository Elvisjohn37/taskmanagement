import { Navigate, Routes, Route, BrowserRouter } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import { BackdropLoader } from "./../components/Loader.jsx";
import MainLayout from "/resources/js/components/MainLayout.jsx";
import { useSelector } from "react-redux";
import { getUserState } from "./login/slice.js";
import { getAppRouteState } from "./approute/slice.js";
import { refreshUserData } from "./approute/userData.js";

const LandingPage = React.lazy(() => import("./LandingPage.jsx"));
const Task = React.lazy(() => import("./Task.jsx"));
const Login = React.lazy(() => import("./Login.jsx"));
const Signup = React.lazy(() => import("./Signup.jsx"));
const Trash = React.lazy(() => import("./Trash.jsx"));

const Approute = () => {
  refreshUserData();
  const user = useSelector(getUserState);
  const appRoute = useSelector(getAppRouteState);

  return appRoute.isLoading ? (
    <BackdropLoader />
  ) : (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
        <Route
            index
            element={
              <>
                {user.isLogin ? (
                  <Suspense fallback={<BackdropLoader />}>
                    <Task />
                  </Suspense>
                ) : (
                  <Suspense fallback={<BackdropLoader />}>
                    <LandingPage />
                  </Suspense>
                )}
              </>
            }
          />
          <Route
            path="/trash"
            element={
              <>
                {user.isLogin ? (
                  <Suspense fallback={<BackdropLoader />}>
                    <Trash />
                  </Suspense>
                ) : (
                  <Navigate to="/" />
                )}
              </>
            }
          />
          <Route
            path="login"
            element={
              <>
                {user.isLogin ? (
                  <Navigate to="/" />
                ) : (
                  <Suspense fallback={<BackdropLoader />}>
                    <Login />
                  </Suspense>
                )}
              </>
            }
          />
          <Route
            path="signup"
            element={
              <>
                {user.isLogin ? (
                  <Navigate to="/" />
                ) : (
                  <Suspense fallback={<BackdropLoader />}>
                    <Signup />
                  </Suspense>
                )}
              </>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Approute;
