import React from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

import SignUpBtn from "components/Buttons/SignUpBtn";
import LoginBtn from "components/Buttons/LoginBtn";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    color: "rgb(112, 112, 112)"
  },
  links: {
    textDecoration: "none"
  }
}));

const Sign = props => {
  const styles = useStyles();

  return (
    <Box className={styles.root}>
      <Link to="/login/" className={styles.links}>
        <LoginBtn />
      </Link>
      <Link to="/sign-up/" className={styles.links}>
        <SignUpBtn />
      </Link>
    </Box>
  );
};

export default Sign;
