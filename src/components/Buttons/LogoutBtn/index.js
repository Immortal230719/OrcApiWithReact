import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles(theme => ({
  btnIn: {
    margin: theme.spacing(2),
    background:
      "linear-gradient(45deg, rgb(42, 224, 170) 30%, rgb(7, 178, 194) 90%)",
    color: "#fff"
  }
}));

const LoginBtn = ({ clickHandler }) => {
  const styles = useStyles();

  return (
    <Button
      variant="contained"
      size="large"
      className={styles.btnIn}
      endIcon={<ExitToAppIcon fontSize="large" color="inherit" />}
      onClick={clickHandler}
    >
      LogOut
    </Button>
  );
};

export default LoginBtn;