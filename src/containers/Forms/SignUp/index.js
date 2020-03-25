import React from "react";
import { Typography } from "@material-ui/core";

import Layout from "components/Layout";
import SignUpComponent from "components/SignUpForm/index";

const SignUpForm = props => {
  const submitHandler = ({ name, email, password, password_confirmation }) => {
    if (password === password_confirmation) {
      console.log("ok");
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
