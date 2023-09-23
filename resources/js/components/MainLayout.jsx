import React from "react";
import styles from "./MainLayout.module.scss";
import MainNavigation from "./MainNavigation";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserState } from "../Pages/login/slice";
import classnames from "classnames";

const MainLayout = () => {
  const user = useSelector(getUserState);

  return (
    <div className={classnames([styles.mainLayout, user.isLogin && "login"])}>
      <MainNavigation />
      <div className={styles.mainContent}>
        <Outlet />
      </div>
      <div className={styles.footer}></div>
    </div>
  );
};

export default MainLayout;
