import React from 'react';
import { useDispatch } from 'react-redux';
import { reset } from 'redux-form';

import CreateProductForm from 'components/Forms/CreateProductForm';
import { loadCreateProductForm } from 'actions/sagaWatcherActions';

const CreateProduct = () => {
  const dispatch = useDispatch();

  const submitHandler = (values) => {
    dispatch(loadCreateProductForm(values));
    dispatch(reset('createP'));
  };

  return (
    <>
      <CreateProductForm onSubmit={submitHandler} />
    </>
  );
};

export default CreateProduct;
