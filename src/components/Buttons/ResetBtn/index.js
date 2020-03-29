import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import RotateLeftRoundedIcon from "@material-ui/icons/RotateLeftRounded";

const useStyles = makeStyles(theme => ({
  btnReset: {
    margin: theme.spacing(2),
    background:
      "linear-gradient(45deg, rgb(98, 219, 250) 30%, rgb(1, 200, 207) 90%)",
    color: "#fff"
  }
}));

const ResetBtn = props => {
  const styles = useStyles();

  return (
    <Button
      type="reset"
      variant="contained"
      color="inherit"
      size="large"
      className={styles.btnReset}
      endIcon={<RotateLeftRoundedIcon fontSize="large" color="inherit" />}
      {...props}
    >
      Reset
    </Button>
  );
};

export default ResetBtn;
