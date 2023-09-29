import React from "react";
import { Button as MuiButton } from "@mui/joy";
import styles from "./Button.module.scss";

const Button = ({
  text,
  onClick = () => null,
  type = "button",
  isLoading = false,
  children,
  size = 'lg'
}) => {
  return (
    <MuiButton
      loading={isLoading}
      type={type}
      className={styles.button}
      onClick={onClick}
      size={size}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
