import React from "react";
import { Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { reset } from "redux-form";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import LoginComponent from "components/Forms/LoginForm";
import BackBtn from "components/Buttons/BackBtn";
import { loadLoginForm } from "actions/sagaWatcherActions";

const useStyles = makeStyles({
  linkBtn: {
    textDecoration: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  wrapper: {
    position: "fixed",
    top: "0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100vh",
    background:
      "linear-gradient(45deg, rgb(255, 184, 251)) 30%, rgb(255, 153, 241) 90%)"
  },
  formWrapper: {
    position: "relative",
    width: "600px",
    padding: "15px",
    background: "rgba(246, 246, 246)",
    borderRadius: "15px"
  }
});

const LoginForm = () => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const submitHandler = () => {
    dispatch(loadLoginForm());
    dispatch(reset("login"));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.formWrapper}>
        <Typography
          align="center"
          variant="h3"
          component="h1"
          gutterBottom={true}
        >
          Login
        </Typography>
        <Typography
          align="center"
          gutterBottom={true}
          variant="subtitle1"
          component="p"
        >
          Please, enter all Fields
        </Typography>
        <LoginComponent onSubmit={submitHandler} />
        <Link className={styles.linkBtn} to="/">
          <BackBtn />
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
