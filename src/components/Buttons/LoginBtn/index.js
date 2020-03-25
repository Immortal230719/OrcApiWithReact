import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import AssignmentInd from "@material-ui/icons/AssignmentInd";

const useStyles = makeStyles(theme => ({
  btnIn: {
    margin: theme.spacing(2),
    background:
      "linear-gradient(45deg, rgb(70, 160, 89) 30%, rgb(0, 180, 105) 90%)",
    color: "#fff"
  }
}));

const LoginBtn = () => {
  const styles = useStyles();

  return (
    <Button
      variant="contained"
      size="large"
      className={styles.btnIn}
      endIcon={<AssignmentInd fontSize="large" color="inherit" />}
    >
      Login
    </Button>
  );
};

export default LoginBtn;
