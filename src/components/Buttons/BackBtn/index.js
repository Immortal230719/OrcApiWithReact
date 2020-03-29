import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import HomeSharpIcon from "@material-ui/icons/HomeSharp";

const useStyles = makeStyles({
  btnBack: {
    background:
      "linear-gradient(45deg, rgb(91, 163, 246) 30%, rgb(7, 103, 212) 90%)",
    color: "#fff",
    width: "100%",
    marginTop: "15px"
  }
});

const BackBtn = () => {
  const styles = useStyles();

  return (
    <Button
      variant="contained"
      size="large"
      className={styles.btnBack}
      endIcon={<HomeSharpIcon fontSize="large" color="inherit" />}
    >
      Back
    </Button>
  );
};

export default BackBtn;
