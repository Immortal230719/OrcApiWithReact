import React from "react";
import { Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";

import Layout from "components/Layout";
import SignUpComponent from "components/SignUpForm/index";
import { loadSignUpForm } from "actions/sagaWatcherActions";

const SignUpForm = props => {
  const dispatch = useDispatch();

  const submitHandler = ({ name, email, password, password_confirmation }) => {
    if (password === password_confirmation) {
      dispatch(loadSignUpForm());
    } else {
      console.log("error");
    }
  };

  return (
    <Layout>
      <Typography
        align="center"
        color="textPrimary"
        variant="h3"
        component="h1"
        gutterBottom={true}
      >
        Sign Up Form
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
    </Layout>
  );
};

export default SignUpForm;
