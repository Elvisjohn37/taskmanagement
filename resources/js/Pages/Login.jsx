import React, { useState } from "react";
import styles from "./Login.module.scss";
import FormGroup from "@mui/material/FormGroup";
import Button from "./../components/Button.jsx";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Alert from "@mui/joy/Alert";
import { validateEmail } from "./../helper.js";
import { login } from "./../backend/requests.js";

const Login = () => {
  const [validated, setValidated] = useState({});
  const [hasInvalid, setHasInvalid] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginStatus, setloginStatus] = useState({});

  const handleLogin = (event) => {
    event.preventDefault();
    
    if (!checkHasInvalid()) {
      setIsLoading(true);
      login({
        data: {
          email: validated.email.value,
          password: validated.password.value,
        },
        success: (response) => {
          const isLogin = response.data?.isLogin;
          if (isLogin) {
            window.location.reload(false);
            dispatch(setUserStatus(response.data));
          } else {
            setloginStatus({
              isError: true,
              message: "Please input valid credentials",
            });
          }
        },
        error: ({ response }) => {
          const data = response.data;
        },
        completed: () => setIsLoading(false),
      });
    } else {
      setHasInvalid(true);
    }
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setValidated({
      ...validated,
      email: {
        value,
        isValid: validateEmail(value) != undefined,
      },
    });
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setValidated({
      ...validated,
      password: {
        value,
        isValid: value,
      },
    });
  };

  const checkHasInvalid = () => {
    const result = !validated.email?.isValid || !validated.password?.isValid;
    setHasInvalid(result);
    return result;
  };

  return (
    <div className={styles.login}>
      <div className={styles.form}>
        <div className={styles.title}>
          <Typography variant="h3" component="h4">
            Login
          </Typography>
        </div>
        {(hasInvalid || loginStatus.isError) && (
          <Alert className={styles.errorMessage} color="danger" variant="soft">
            {loginStatus.isError
              ? loginStatus.message
              : "Please input valid credentials"}
          </Alert>
        )}
        <form>
          <FormGroup className={styles.formGroup}>
            <TextField
              onChange={handleEmailChange}
              error={validated.email?.value && !validated.email.isValid}
              id="standard-basic"
              label="Email"
              variant="standard"
            />
          </FormGroup>
          <FormGroup className={styles.formGroup}>
            <TextField
              onChange={handlePasswordChange}
              error={validated.password?.value && !validated.password.isValid}
              id="standard-basic"
              label="Password"
              variant="standard"
              type="password"
            />
          </FormGroup>
          <FormGroup className={styles.formGroup}>
            <Button isLoading={isLoading} type="submit" onClick={handleLogin}>
              Login
            </Button>
          </FormGroup>
        </form>
      </div>
    </div>
  );
};

export default Login;
