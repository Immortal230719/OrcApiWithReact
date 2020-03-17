import React from 'react';
import { connect } from 'react-redux';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

import { getBackdrop } from 'selectors';

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));



const CustomBackdrop = ({ backdrop: { show } }) => {
  const classes = useStyles();

  return (
    <Backdrop className={classes.backdrop} open={show}>
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}

const mapStateToProps = state => {
  return {
    backdrop: getBackdrop(state)
  }
}

export default connect(mapStateToProps, null)(CustomBackdrop);