import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "redux-form";
import { useParams, Redirect } from "react-router-dom";

import PatchProductForm from "components/Forms/PatchProductForm";
import { loadPatchProductForm } from "actions/sagaWatcherActions";
import { getProduct } from "selectors";

const PatchProduct = () => {
  const dispatch = useDispatch();
  let { slug } = useParams();
  let product = useSelector(getProduct);

  const [submitted, setSubmitted] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(loadPatchProductForm());
    dispatch(reset("patchP"));
    setSubmitted(true);
  };

  if (submitted && product.slug !== slug) {
    return <Redirect to={`/products/${product.slug}`} />;
  }

  return (
    <>
      <PatchProductForm handleSubmit={submitHandler} />
    </>
  );
};

export default PatchProduct;
