import React, { useState } from "react";
import styles from "./Signup.module.scss";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import Button from "./../components/Button.jsx";
import Typography from "@mui/material/Typography";
import Alert from "@mui/joy/Alert";
import { validateEmail, validateFullName } from "./../helper.js";
import { register } from "./../backend/requests.js";
import { useDispatch } from "react-redux";
import { setUserStatus } from "./login/slice";

const Signup = () => {
  const [validated, setValidated] = useState({});
  const [hasInvalid, setHasInvalid] = useState("");
  const [registrationStatus, setRegistrationStatus] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSignup = (event) => {
    event.preventDefault();
    if (!checkHasInvalid()) {
      setIsLoading(true);
      register({
        data: {
          fullName: validated.fullName.value,
          email: validated.email.value,
          password: validated.password.value,
        },
        success: (response) => {
          dispatch(setUserStatus(response.data));
          setRegistrationStatus({});
        },
        error: ({ response }) => {
          const data = response.data;
          setRegistrationStatus({
            isError: true,
            message: data.message,
          });
        },
        completed: () => setIsLoading(false),
      });
    }
  };

  const checkHasInvalid = () => {
    const result =
      !validated.fullName?.isValid ||
      !validated.email?.isValid ||
      !validated.password?.isValid ||
      !validated.confirmPassword?.isValid;
    setHasInvalid(result);
    return result;
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

  const handleFullNameChange = (event) => {
    const value = event.target.value;
    setValidated({
      ...validated,
      fullName: {
        value,
        isValid: validateFullName(value) != undefined,
      },
    });
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    const confirmPassword = validated.confirmPassword?.value;
    const isValid = confirmPassword && confirmPassword == value;
    setValidated({
      ...validated,
      password: {
        value,
        isValid,
      },
      confirmPassword: {
        ...validated.confirmPassword,
        isValid,
      },
    });
  };

  const handleConfirmPasswordChange = (event) => {
    const value = event.target.value;
    const password = validated.password?.value;
    const isValid = password && password == value;
    setValidated({
      ...validated,
      confirmPassword: {
        value,
        isValid,
      },
      password: {
        ...validated.password,
        isValid,
      },
    });
  };

  return (
    <div className={styles.signup}>
      <div className={styles.form}>
        <div className={styles.title}>
          <Typography variant="h3" component="h4">
            Signup
          </Typography>
        </div>
        {(hasInvalid || registrationStatus.isError) && (
          <Alert className={styles.errorMessage} color="danger" variant="soft">
            {registrationStatus.isError
              ? registrationStatus.message
              : "Please input valid credentials"}
          </Alert>
        )}
        <form>
          <FormGroup className={styles.formGroup}>
            <TextField
              error={validated.fullName?.value && !validated.fullName.isValid}
              onChange={handleFullNameChange}
              id="standard-basic"
              label="Full Name"
              variant="standard"
            />
          </FormGroup>
          <FormGroup className={styles.formGroup}>
            <TextField
              onChange={handleEmailChange}
              error={validated.email?.value && !validated.email.isValid}
              type="email"
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
            <TextField
              onChange={handleConfirmPasswordChange}
              error={
                validated.confirmPassword?.value &&
                !validated.confirmPassword.isValid
              }
              id="standard-basic"
              label="Confirm Password"
              variant="standard"
              type="password"
            />
          </FormGroup>
          <FormGroup className={styles.formGroup}>
            <Button isLoading={isLoading} type="submit" onClick={handleSignup}>
              Signup
            </Button>
          </FormGroup>
        </form>
      </div>
    </div>
  );
};

export default Signup;
