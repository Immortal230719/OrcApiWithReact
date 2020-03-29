import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import SendRoundedIcon from "@material-ui/icons/SendRounded";

const useStyles = makeStyles(theme => ({
  btnSubmit: {
    margin: theme.spacing(2),
    background:
      "linear-gradient(45deg, rgb(64, 238, 107) 30%,rgb(6, 235, 120) 90%)",
    color: "#fff"
  }
}));

const SubmitBtn = props => {
  const styles = useStyles();

  return (
    <Button
      type="submit"
      variant="contained"
      color="inherit"
      size="large"
      className={styles.btnSubmit}
      endIcon={<SendRoundedIcon fontSize="large" color="inherit" />}
      {...props}
    >
      Submit
    </Button>
  );
};

export default SubmitBtn;
