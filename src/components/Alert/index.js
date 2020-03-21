import React from "react";
import { Alert, AlertTitle } from "@material-ui/lab";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import { getError } from "selectors";
import { resetError } from "actions/errorActions";

const useStyles = makeStyles({
  absolute: {
    width: "100%",
    height: "150px",
    fontSize: "30px"
  },
  wrapper: {
    position: "fixed",
    top: "0",
    width: "100%",
    height: "100vh",
    zIndex: "5",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#ccc",
    padding: "15%"
  }
});

const MyAlert = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const { error, message } = useSelector(getError);

  const renderError = (error, message) => {
    if (error) {
      return (
        <div className={styles.wrapper} onClick={() => dispatch(resetError())}>
          <Alert
            className={styles.absolute}
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                onClick={() => dispatch(resetError())}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            <AlertTitle>Error</AlertTitle>
            {message}
          </Alert>
        </div>
      );
    }
    return null;
  };

  return <>{renderError(error, message)}</>;
};

export default MyAlert;
