import React, { useEffect } from "react";

import { useDispatch, useSelector } from 'react-redux';
import { Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import AvatarUploader from 'components/AvatarUploader';

import BackBtn from "components/Buttons/BackBtn";
import Layout from "components/Layout";
import Header from 'containers/Header';

import { getUser } from 'selectors';
import {  getAuthToken } from 'utils/tokenUtils';
import { loadAuthMe } from "actions/sagaWatcherActions";

const useStyles = makeStyles({
  wrapper: {
    textDecoration: "none"
  }
});

const Profile = ({ match }) => {
  const { id, name, email, loggedIn, avatar } = useSelector(getUser);  
  const dispatch = useDispatch();
  const styles = useStyles();
  let token = getAuthToken();
  
  useEffect(() => {  
    if (token && !id) {
      
      dispatch(loadAuthMe());
    }
  }, [dispatch, loggedIn, id, token]) 

  return (
    <Layout >
      <Header />
      <Grid container spacing={3}>
        <Grid item sm={4} xs={12} md={3}>
          <AvatarUploader
           src={avatar}
          />
        </Grid>
        <Grid item sm={8} xs={12} md={9}>
          <Typography
            color="primary"
            gutterBottom={true}
            align="left"
            variant="h3"
            component="h1"
          >
            {name}
          </Typography>
          <Typography
            color="primary"
            paragraph={true}
            variant="h5"
            component="strong"
          >
            {email}
          </Typography>
          <Typography
            className={styles.title}
            paragraph={true}
            variant="body2"
            component="p"
          >
            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
            ab illo inventore veritatis et quasi architecto beatae vitae dicta
            sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
            aspernatur aut odit aut fugit, sed quia consequuntur
          </Typography>
        </Grid>
      </Grid>   
      <Link className={styles.wrapper} to="/">
        <BackBtn />
      </Link>
    </Layout>
  );
};

export default Profile;