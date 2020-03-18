import React, { useEffect } from 'react';

import  {makeStyles} from '@material-ui/core/styles';

import { getProduct } from 'selectors';
import { fetchSingleProduct } from 'actions/apiActions';
import { connect } from 'react-redux';

const useStyles = makeStyles({
  wrapper: {
    color: 'red'
  }
})

const SingleProduct = ({product, fetchSingleProduct, match}) => {
  const slug = match.params.slug

  useEffect(() => {        
    fetchSingleProduct(slug)
  }, [fetchSingleProduct, slug])

  console.log(product);
  

  const styles = useStyles()

  return(
    <div
      className={styles.wrapper}
    >
      product
    </div>
  )
}

const mapStateToProps = state => {
  return {
    product: getProduct(state)
  }
}

const mapDispatchToProps = {
  fetchSingleProduct
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
