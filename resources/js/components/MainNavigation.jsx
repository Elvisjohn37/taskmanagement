import React, { useState } from "react";
import styles from "./MainNavigation.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck, faBars } from "@fortawesome/free-solid-svg-icons";
import classnames from "classnames";
import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserState } from "../Pages/login/slice";
import { logout } from "../backend/requests";
import { useDispatch } from "react-redux";
import { deleteUserLogin } from "../Pages/login/slice";

const MainNavigation = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [toggle, setToggle] = useState(true);
  const user = useSelector(getUserState);
  const dispatch = useDispatch();

  const handleBarMenu = () => {
    setShowMobileMenu((state) => !state);
    setToggle(!showMobileMenu);
  };

  const handleToggle = () => {
    setToggle(false);
    setShowMobileMenu(false);
  };

  const handleLogout = () => {
    logout({
      success: () => {
        dispatch(deleteUserLogin({ isLogin: false }));
        window.location.reload(false);
      },
    });
  };

  return (
    <>
      <div className={styles.mainNavigation}>
        <div className={styles.brandSection}>
          <FontAwesomeIcon icon={faListCheck} size="lg" />
          <div className={styles.brand}>
            <NavLink to="/">TASK MANAGEMENT SYSTEM</NavLink>
          </div>
        </div>
        <FontAwesomeIcon
          onClick={handleBarMenu}
          className={styles.bars}
          icon={faBars}
          size="lg"
        />
        <div
          className={classnames([
            styles.loginSignUp,
            toggle && showMobileMenu && styles.mobileMenu,
            user.isLogin && styles.logoutMenu,
          ])}
        >
          {user.isLogin ? (
            <>
              <div onClick={handleToggle} className={styles.trash}>
                <NavLink to="/trash">TRASH</NavLink>
              </div>
              <div onClick={handleToggle} className={styles.logout}>
                <Link onClick={handleLogout}>LOGOUT</Link>
              </div>
            </>
          ) : (
            <>
              <div onClick={handleToggle} className={styles.login}>
                <NavLink to="/login">LOGIN</NavLink>
              </div>
              <div onClick={handleToggle} className={styles.signUp}>
                <NavLink to="/signup">SIGN UP</NavLink>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MainNavigation;
