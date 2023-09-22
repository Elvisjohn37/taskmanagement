import React from "react";
import styles from "./MainLayout.module.scss";
import MainNavigation from "./MainNavigation";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className={styles.mainLayout}>
      <MainNavigation />
      <div className={styles.mainContent}>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
