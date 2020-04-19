import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

import Logo from "components/Logo";
import Sign from "components/Sign";
import User from 'containers/Header/User';

const useStyles = makeStyles({
  header: {
    maxHeight: "200px",
    padding: "30px 0"
  }
});

const Header = ({ auth }) => {
  const styles = useStyles();

  return (
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
          { auth
            ?
            <Grid item>
              <User />
            </Grid>
            :           
            <Grid item>
              <Sign />
            </Grid>            
          }
        </Grid>
      </Container>
    </header>
  );
};

export default Header;
