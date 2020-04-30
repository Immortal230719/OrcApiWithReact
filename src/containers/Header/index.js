import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { useSelector } from "react-redux";

import { getLoggedIn } from "selectors";

import Logo from "components/Logo";
import Sign from "components/Sign";
import User from "containers/Header/User";
import ErrorBoundary from "components/ErrorBoundary";

const useStyles = makeStyles({
  header: {
    position: "relative",
    zIndex: 1,
    maxHeight: "200px",
    padding: "30px 0",
  },
});

const Header = () => {
  const loggedIn = useSelector(getLoggedIn);
  const styles = useStyles();

  return (
    <ErrorBoundary>
      <header>
        <Container className={styles.header} maxWidth="lg">
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item>
              <Logo />
            </Grid>
            {loggedIn ? (
              <Grid item>
                <User />
              </Grid>
            ) : (
              <Grid item>
                <Sign />
              </Grid>
            )}
          </Grid>
        </Container>
      </header>
    </ErrorBoundary>
  );
};

export default Header;
