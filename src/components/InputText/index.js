import React from "react";
import TextField from "@material-ui/core/TextField";

const renderTextField = ({
  label,
  input,
  classStyles,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextField
    styles={{
      color: "#fff"
    }}
    label={label}
    className={classStyles}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
  />
);

export default renderTextField;
