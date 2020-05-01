import React from "react";
import { Field, reduxForm } from "redux-form";
import { makeStyles } from "@material-ui/core/styles";

import SubmitBtn from "components/Buttons/SubmitBtn";
import ResetBtn from "components/Buttons/ResetBtn";
import renderTextField from "components/InputText";

const useStyles = makeStyles({
  form: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    margin: "0 auto",
  },
  flex: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "15px",
  },
  inputText: {
    "& label": {
      color: "#fff",
    },
    "& div": {
      color: "#fff",
      "& fieldset": {
        border: "none",
        background: "inherit",
      },
    },
  },
});

const valueTrim = (value) => value && value.trim();

const validate = (values) => {
  const errors = {};
  const requiredFields = ["name", "email", "password", "password_confirmation"];

  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });
  if (values.name && values.name.length < 2) {
    errors.name = "Your name must be more than two character";
  }
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = "Invalid email address";
  }
  if (values.password !== values.password_confirmation) {
    errors.password_confirmation = "Passwords entered do not match";
  }
  return errors;
};

//Validate functions

const SignUpComponent = (props) => {
  const {
    animate1,
    animate2,
    animate3,
    animate4,
    handleSubmit,
    pristine,
    reset,
    submitting,
    invalid,
  } = props;
  const styles = useStyles();

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Field
          className={styles.inputText}
          margin="dense"
          id="Name"
          name="name"
          label="Name"
          variant="outlined"
          onBlur={animate1}
          component={renderTextField}
        />
        <Field
          className={styles.inputText}
          margin="dense"
          id="Email"
          name="email"
          label="Email"
          variant="outlined"
          onBlur={animate2}
          component={renderTextField}
          normalize={valueTrim}
        />
        <Field
          className={styles.inputText}
          margin="dense"
          id="Password"
          name="password"
          label="Password"
          variant="outlined"
          type="password"
          onBlur={animate3}
          component={renderTextField}
        />
        <Field
          className={styles.inputText}
          margin="dense"
          id="ConfirmPassword"
          name="password_confirmation"
          label="ConfirmPassword"
          variant="outlined"
          type="password"
          onBlur={animate4}
          component={renderTextField}
        />
        <div className={styles.flex}>
          <ResetBtn disabled={pristine || submitting} onClick={reset}>
            Reset
          </ResetBtn>
          <SubmitBtn disabled={pristine || submitting || invalid}>
            Submit
          </SubmitBtn>
        </div>
      </form>
    </>
  );
};

export default reduxForm({
  form: "signUp",
  validate,
})(SignUpComponent);
