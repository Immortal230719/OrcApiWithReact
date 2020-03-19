import React from 'react';
import * as R from 'ramda';
import { 
  Typography,
  Card, 
  CardContent, 
  CardActionArea, 
  CardActions,
  Avatar,
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    width: '90%',
    height: '90%',
  },
  wrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionArea: {
    height: '50%'
  },
  avatar: {
    position: 'relative',
    right: '10px',
    height: '20px',
    width: '20px',
  },
  cardActions: {
    height: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: '20px'
  },
  cardHeader: {
    textDecoration: 'none'
  },
  link: {
    display: 'flex',
    width: "100%",
    justifyContent: "flex-start",
    margin: '3px 0',
    padding: '7px 15px',
    textDecoration: 'none',
    '& p': {
      color: '#aaa',
      fontSize: '14px'
    }
  }
}); 

const Product = ({product: {id, title, slug, description, owners, status}}) => {
  const styles = useStyles();
  const shortDescripton = R.take(60, description);  
  
  const renderOwner = ({ id, name, email, avatar }) => {
    return(
      <Link key={id} className={styles.link} to={`/owners/:${id}`}>
        <Avatar className={styles.avatar} alt={name} src={avatar} />
        <Typography>{name}</Typography>
      </Link>
    )    
  }

  return (
    <div className={styles.wrapper}>
      <Card className={styles.root}>
        <Link className={styles.cardHeader} to={`/products/${slug}`}>
          <CardActionArea className={styles.actionArea}>
            <CardContent>
              <Typography color="textPrimary" align='center' gutterBottom variant='subtitle2' component='h3'>
                {title}
              </Typography>
              <Typography variant='caption' color='textSecondary' component='p'>
                { shortDescripton }...
              </Typography>
            </CardContent>
          </CardActionArea>
        </Link>
        <CardActions className={styles.cardActions}>
          { R.map( owner => renderOwner(owner), owners ) }
        </CardActions>
      </Card>
    </div>
  )
}

export default Product;