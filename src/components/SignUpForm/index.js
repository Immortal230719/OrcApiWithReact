import React from "react";
import { Field, reduxForm } from "redux-form";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  form: {
    display: "flex",
    flexDirection: "column",
    width: "50%",
    margin: "0 auto"
  },
  flex: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "15px"
  }
});

const validate = values => {
  const errors = {};
  const requiredFields = ["name", "email", "password", "password_confirmation"];

  requiredFields.forEach(field => {
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

const renderTextField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextField
    label={label}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
  />
);

const SignUpComponent = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  const styles = useStyles();

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Field
          margin="dense"
          id="Name"
          name="name"
          label="Name"
          variant="outlined"
          component={renderTextField}
        />
        <Field
          margin="dense"
          id="Email"
          name="email"
          label="Email"
          variant="outlined"
          component={renderTextField}
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
        <Field
          margin="dense"
          id="ConfirmPassword"
          name="password_confirmation"
          label="ConfirmPassword"
          variant="outlined"
          type="password"
          component={renderTextField}
        />
        <div className={styles.flex}>
          <Button
            variant="outlined"
            color="secondary"
            type="reset"
            disabled={pristine || submitting}
            onClick={reset}
          >
            Reset
          </Button>
          <Button
            variant="outlined"
            color="primary"
            type="submit"
            disabled={pristine || submitting}
          >
            Submit
          </Button>
        </div>
      </form>
    </>
  );
};

export default reduxForm({
  form: "signUp",
  validate
})(SignUpComponent);
