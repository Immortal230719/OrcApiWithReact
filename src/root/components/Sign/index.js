import React from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import AssignmentInd from '@material-ui/icons/AssignmentInd';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    color: 'rgb(112, 112, 112)'
  },
  btnIn: {
    margin: theme.spacing(2),
    background: 'linear-gradient(45deg, rgb(70, 160, 89) 30%, rgb(0, 180, 105) 90%)',
    color: '#fff',
  },
  btnUp: {
    margin: theme.spacing(2),
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    color: '#fff',
  }
}))

const Sign = props => {
  const styles = useStyles();

  return (
    <Box className={styles.root}>
      <Button
        variant="contained"
        size="large"
        className={styles.btnIn}
        endIcon={<AssignmentInd fontSize='large' color="inherit"/>}
      >
        Sign In
      </Button>
      <Button
        variant="contained"
        color="inherit"
        size="large"
        className={styles.btnUp}
        endIcon={<AssignmentTurnedInIcon fontSize='large' color="inherit"/>}
      >
        Sign Up
      </Button>
    </Box>
  )
}

export default Sign;