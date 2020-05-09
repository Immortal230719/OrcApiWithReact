import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';

const CardOwner = ({ owner: { id, name, avatar }, styles }) => {
  return (
    <Link key={id} className={styles.link} to={`/owners/${id}`}>
      <Avatar className={styles.avatar} alt={name} src={avatar} />
      <Typography>{name}</Typography>
    </Link>
  );
};

export default CardOwner;

CardOwner.propTypes = {
  owner: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    avatar: PropTypes.string,
  }).isRequired,
  styles: PropTypes.objectOf(PropTypes.string).isRequired,
};
