import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  List,
  ListItem,
  ListItemIcon,
  Avatar,
  ListItemText,
  ListSubheader,
  Button
} from "@material-ui/core";
import { getProduct } from "selectors";
import { fetchSingleProduct } from "actions/apiActions";
import { connect } from "react-redux";

import Layout from "components/Layout";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  wrapper: {
    textDecoration: "none",
    color: "#acacac"
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

const SingleProduct = ({ product, fetchSingleProduct, match }) => {
  const slugInRouter = match.params.slug;
  const styles = useStyles();
  const { title, description, owners } = product;

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

  useEffect(() => {
    fetchSingleProduct(slugInRouter);
  }, [fetchSingleProduct, slugInRouter]);

  return (
    <Layout>
      <Typography
        align="center"
        variant="h3"
        component="h1"
        gutterBottom={true}
      >
        {title}
      </Typography>
      <Typography
        className={styles.text}
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
          <Button className={styles.btnBack} variant="contained">
            Back to Products
          </Button>
        </Link>
      </List>
    </Layout>
  );
};

const mapStateToProps = state => {
  return {
    product: getProduct(state)
  };
};

const mapDispatchToProps = {
  fetchSingleProduct
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
