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
});

const valueTrim = (value) => value && value.trim();

const validate = (values) => {
  const errors = {};
  const requiredFields = ["email", "password"];
  for (let key in values) {
    key = values[key].trim();
  }

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
  return errors;
};

//Validate functions

const LoginComponent = (props) => {
  const { handleSubmit, pristine, reset, submitting, invalid } = props;
  const styles = useStyles();

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Field
          margin="dense"
          id="Email"
          name="email"
          label="Email"
          variant="outlined"
          component={renderTextField}
          normalize={valueTrim}
        />
        <Field
          margin="dense"
          id="Password"
          name="password"
          label="Password"
          variant="outlined"
          type="password"
          component={renderTextField}
        />
        <div className={styles.flex}>
          <ResetBtn disabled={pristine || submitting} onClick={reset}>
            Reset
          </ResetBtn>
          <SubmitBtn disabled={pristine || submitting || invalid}>
            Login
          </SubmitBtn>
        </div>
      </form>
    </>
  );
};

export default reduxForm({
  form: "login",
  validate,
})(LoginComponent);
