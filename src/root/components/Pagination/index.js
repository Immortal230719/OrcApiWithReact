import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import { getProducts } from 'selectors';
import { fetchProductsPage } from 'actions/apiActions';

const useStyles = makeStyles(theme => ({
  wrapper: {
    '& ul': {
      justifyContent: 'center'
    }
  }
}))

const Paginator = ({ fetchProductsPage, products: { meta } }) => {
  const styles = useStyles();

  const handleChange = (event, page) => {
    event.preventDefault();
    fetchProductsPage(page)
  }

  return (
    <div>
      <Pagination
        className={styles.wrapper}
        count={meta.last_page}
        shape='rounded' 
        size='large' 
        hidePrevButton 
        hideNextButton
        onChange={handleChange}
      />
    </div>
  )
}

const mapDispatchToProps = {
  fetchProductsPage
}

const mapStateToProps = state => {
  return {
    products: getProducts(state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Paginator);