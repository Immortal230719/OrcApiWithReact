import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Typography, Grid } from "@material-ui/core";
import DoneOutlineRoundedIcon from "@material-ui/icons/DoneOutlineRounded";
import { makeStyles } from "@material-ui/core/styles";
import { Link, Redirect } from "react-router-dom";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

import AvatarUploader from "components/AvatarUploader";
import BackBtn from "components/Buttons/BackBtn";
import Layout from "components/Layout";
import Header from "containers/Header";
import CreateProduct from "containers/Forms/CreateProduct";

import { getUser } from "selectors";
import { getAuthToken } from "utils/tokenUtils";
import { loadAuthMe } from "actions/sagaWatcherActions";
import { setCreatedToFalse } from "actions/syncActions";

const useStyles = makeStyles({
  wrapper: {
    textDecoration: "none",
  },
  icon: {
    marginLeft: "15px",
    position: "relative",
    top: "4px",
  },
  successCreate: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    "& span": {
      cursor: "pointer",
      padding: "10px",
      borderRadius: "5px",
      "&:hover": {
        background:
          "linear-gradient(120deg, rgba(28, 236, 132, 0.431), rgba(8, 170, 35, 0.431))",
      },
    },
  },
});

const Profile = ({ match }) => {
  const { id, name, email, loggedIn, avatar, created } = useSelector(getUser);
  const dispatch = useDispatch();
  const styles = useStyles();
  let token = getAuthToken();

  useEffect(() => {
    if (token && !id) {
      dispatch(loadAuthMe());
    }
  }, [dispatch, loggedIn, id, token]);

  const closeHandler = () => {
    dispatch(setCreatedToFalse());
  };

  if (!loggedIn && !token) {
    return <Redirect to="/" />;
  }

  return (
    <Layout>
      <Header />
      <Grid container spacing={3}>
        <Grid item sm={4} xs={12} md={3}>
          <AvatarUploader src={avatar} />
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
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
            aspernatur aut odit aut fugit, sed quia consequuntur
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item sm={4} xs={12} md={6}>
          <Typography
            color="primary"
            paragraph={true}
            variant="h5"
            component="strong"
          >
            Create new Product
          </Typography>
          <CreateProduct />
          {created ? (
            <ClickAwayListener onClickAway={closeHandler}>
              <Typography
                className={styles.successCreate}
                color="primary"
                variant="h5"
                component="strong"
              >
                Thank You! <br /> Product has been created!
                <Typography
                  onClick={closeHandler}
                  component="span"
                  variant="h5"
                >
                  OK
                  <DoneOutlineRoundedIcon className={styles.icon} />
                </Typography>
              </Typography>
            </ClickAwayListener>
          ) : null}
        </Grid>
      </Grid>
      <Link className={styles.wrapper} to="/">
        <BackBtn text="Go to Products" />
      </Link>
    </Layout>
  );
};

export default Profile;
