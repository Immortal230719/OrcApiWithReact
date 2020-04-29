import React from "react";
import { Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "redux-form";
import { Link, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import LoginComponent from "components/Forms/LoginForm";
import BackBtn from "components/Buttons/BackBtn";
import ErrorBoundary from "components/ErrorBoundary";
import { loadLoginForm } from "actions/sagaWatcherActions";
import { getLoggedIn } from "selectors";

const useStyles = makeStyles({
  linkBtn: {
    textDecoration: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    position: "fixed",
    top: "0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100vh",
    background: "linear-gradient(45deg, #111, #000)",
  },
  formWrapper: {
    position: "relative",
    width: "600px",
    padding: "15px",
    borderRadius: "15px",
  },
});

const LoginForm = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const loggedIn = useSelector(getLoggedIn);

  const submitHandler = () => {
    dispatch(loadLoginForm());
    dispatch(reset("login"));
  };

  if (loggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <ErrorBoundary>
      <div className={styles.wrapper}>
        <div className={styles.formWrapper}>
          <Typography
            color="primary"
            align="center"
            variant="h3"
            component="h1"
            gutterBottom={true}
          >
            Login
          </Typography>
          <Typography
            color="primary"
            align="center"
            gutterBottom={true}
            variant="subtitle1"
            component="p"
          >
            Please, enter all Fields
          </Typography>
          <LoginComponent onSubmit={submitHandler} />
          <Link className={styles.linkBtn} to="/">
            <BackBtn>Back</BackBtn>
          </Link>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default LoginForm;
