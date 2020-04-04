import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  List,
  ListItem,
  ListItemIcon,
  Avatar,
  ListItemText,
  ListSubheader
} from "@material-ui/core";
import { getProduct } from "selectors";
import { useDispatch, useSelector } from "react-redux";
import Layout from "components/Layout";
import { Link } from "react-router-dom";

import { loadSingleProduct } from "actions/sagaWatcherActions";
import Header from "containers/Header";
import BackBtn from "components/Buttons/BackBtn";

const useStyles = makeStyles({
  wrapper: {
    textDecoration: "none",
    color: "#ddd"
  },
  text: {
    width: "50%",
    margin: "0 auto"
  },
  subTitle: {
    fontSize: "25px"
  },
  btnBack: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "60px",
    width: "50%",
    margin: "0 auto",
    marginTop: "30px",
    cursor: "pointer",
    textTransform: "uppercase",
    background:
      "linear-gradient(160deg, rgb(44, 206, 255), rgb(10, 98, 199) 100%)",
    borderRadius: "8px",
    color: "#fff",
    textDecoration: "none"
  }
});

const SingleProduct = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const product = useSelector(getProduct);

  let { title, description, owners } = product;

  useEffect(() => {
    dispatch(loadSingleProduct());
  }, [dispatch]);

  const renderOwners = (owners, styles) => {
    if (Array.isArray(owners)) {
      return owners.map(({ id, name, email, avatar }) => {
        return (
          <Link className={styles.wrapper} key={email} to={`/owners/${id}`}>
            <ListItem button>
              <ListItemIcon>
                <Avatar variant="rounded" src={avatar} />
              </ListItemIcon>
              <ListItemText primary={name} />
              <ListItemText primary={email} />
            </ListItem>
          </Link>
        );
      });
    } else return null;
  };

  return (
    <>
      <Header />
      <Layout>
        <Typography
          color="primary"
          align="center"
          variant="h3"
          component="h1"
          gutterBottom={true}
        >
          {title}
        </Typography>
        <Typography
          color="primary"
          paragraph={true}
          align="center"
          variant="body2"
          component="p"
        >
          {description}
        </Typography>
        <List
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader
              className={styles.subTitle}
              component="h2"
              id="nested-list-subheader"
            >
              Owners
            </ListSubheader>
          }
        >
          {renderOwners(owners, styles)}
          <Link className={styles.wrapper} to="/">
            <BackBtn />
          </Link>
        </List>
      </Layout>
    </>
  );
};

export default SingleProduct;
