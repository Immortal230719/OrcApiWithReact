import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const renderSelectField = ({
  value,
  input,
  label,
  variant,
  children,
  name,
  ...custom
}) => (
  <>
    <FormControl>
      <InputLabel
        required={true}
        color="primary"
        style={{ padding: "0 7px" }}
        disabled={true}
        htmlFor={label}
      >
        Status
      </InputLabel>
      <Select
        native
        variant={variant}
        value={value}
        {...input}
        {...custom}
        inputProps={{
          name: name,
          id: label,
        }}
      >
        {children}
      </Select>
    </FormControl>
  </>
);

export default renderSelectField;
