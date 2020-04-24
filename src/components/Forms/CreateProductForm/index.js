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

const validate = (values) => {
  const errors = {};
  const requiredFields = ["title", "description"];

  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "This field is required";
    }
  });
  return errors;
};

//Validate functions

const CreateProductForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  const styles = useStyles();

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
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
        <div className={styles.flex}>
          <ResetBtn
            type="reset"
            disabled={pristine || submitting}
            onClick={reset}
          />
          <SubmitBtn text={"Create"} disabled={pristine || submitting} />
        </div>
      </form>
    </>
  );
};

export default reduxForm({
  form: "createP",
  validate,
})(CreateProductForm);
