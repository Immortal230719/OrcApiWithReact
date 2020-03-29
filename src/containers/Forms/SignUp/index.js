import React, { useState } from "react";
import { Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { reset } from "redux-form";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import SignUpComponent from "components/Forms/SignUpForm/index";
import BackBtn from "components/Buttons/BackBtn";
import { loadSignUpForm } from "actions/sagaWatcherActions";

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

const SignUpForm = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const [success, setSuccess] = useState(false);

  const submitHandler = ({ name, email, password, password_confirmation }) => {
    if (password === password_confirmation) {
      dispatch(loadSignUpForm());
      dispatch(reset("signUp"));
      setSuccess(true);
    } else {
      console.log("error");
    }
  };

  return (
    <div className={styles.wrapper}>
      {!success ? (
        <div className={styles.formWrapper}>
          <Typography
            align="center"
            variant="h3"
            component="h1"
            gutterBottom={true}
          >
            Sign Up
          </Typography>
          <Typography
            align="center"
            gutterBottom={true}
            variant="subtitle1"
            component="p"
          >
            Please, enter all Fields
          </Typography>
          <SignUpComponent onSubmit={submitHandler} />
          <Link className={styles.linkBtn} to="/">
            <BackBtn />
          </Link>
        </div>
      ) : (
        <div className={styles.formWrapper}>
          <Typography
            align="center"
            gutterBottom={true}
            variant="h5"
            component="h3"
          >
            Successfully registered. <br />
            Confirmation link has been sent to specified email. <br />
            Please, check your email.
          </Typography>
          <Link className={styles.linkBtn} to="/">
            <BackBtn />
          </Link>
        </div>
      )}
    </div>
  );
};

export default SignUpForm;
