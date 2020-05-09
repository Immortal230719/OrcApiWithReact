import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { reset } from 'redux-form';
import { useParams, Redirect } from 'react-router-dom';

import PatchProductForm from 'components/Forms/PatchProductForm';
import { loadPatchProductForm } from 'actions/sagaWatcherActions';
import { getProduct } from 'selectors';

const PatchProduct = ({ title, description, status }) => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const product = useSelector(getProduct);

  const [submitted, setSubmitted] = useState(false);

  const submitHandler = (data) => {
    dispatch(loadPatchProductForm(data));
    dispatch(reset('patchP'));
    setSubmitted(true);
  };

  if (submitted && product.slug !== slug) {
    return <Redirect to={`/products/${product.slug}`} />;
  }

  return (
    <>
      <PatchProductForm
        className='marginBorder'
        enableReinitialize
        onSubmit={submitHandler}
        initialValues={{
          title,
          description,
          status,
        }}
      />
    </>
  );
};

export default PatchProduct;

PatchProduct.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  status: PropTypes.number.isRequired,
};
