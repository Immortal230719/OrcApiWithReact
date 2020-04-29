import React from "react";
import { Field, reduxForm } from "redux-form";
import { makeStyles } from "@material-ui/core/styles";

import SubmitBtn from "components/Buttons/SubmitBtn";
import ResetBtn from "components/Buttons/ResetBtn";
import renderTextField from "components/InputText";
import renderSelectField from "components/inputSelect";

const useStyles = makeStyles({
  form: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    margin: "0 auto",
    padding: "15px",
  },
  flex: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "15px",
  },
});

const validate = (values) => {
  const errors = {};
  const requiredFields = ["title", "description", "status"];

  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "This field is required";
    }
  });
  return errors;
};

//Validate functions

const PatchProductForm = (props) => {
  const {
    handleSubmit,
    pristine,
    reset,
    submitting,
    invalid,
    className,
  } = props;
  const styles = useStyles();

  return (
    <>
      <form className={`${styles.form} ${className}`} onSubmit={handleSubmit}>
        <Field
          margin="dense"
          id="Title"
          name="title"
          label="Title"
          variant="outlined"
          type="text"
          component={renderTextField}
        />
        <Field
          margin="dense"
          id="Description"
          name="description"
          label="Description"
          variant="outlined"
          type="text"
          multiline
          rowsMax="4"
          component={renderTextField}
        />
        <Field
          variant="filled"
          id="Status"
          name="status"
          label="Status"
          component={renderSelectField}
        >
          <option value="" />
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </Field>
        <div className={styles.flex}>
          <ResetBtn disabled={pristine || submitting} onClick={reset}>
            Reset
          </ResetBtn>
          <SubmitBtn disabled={pristine || submitting || invalid}>
            Update
          </SubmitBtn>
        </div>
      </form>
    </>
  );
};

export default reduxForm({
  form: "patchP",
  validate,
})(PatchProductForm);
