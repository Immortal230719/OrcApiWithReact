import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "redux-form";
import { useParams, Redirect } from "react-router-dom";

import PatchProductForm from "components/Forms/PatchProductForm";
import { loadPatchProductForm } from "actions/sagaWatcherActions";
import { getProduct } from "selectors";

const PatchProduct = ({ title, description, status }) => {
  const dispatch = useDispatch();
  let { slug } = useParams();
  let product = useSelector(getProduct);

  const [submitted, setSubmitted] = useState(false);

  const submitHandler = (data) => {
    dispatch(loadPatchProductForm(data));
    dispatch(reset("patchP"));
    setSubmitted(true);
  };

  if (submitted && product.slug !== slug) {
    return <Redirect to={`/products/${product.slug}`} />;
  }

  return (
    <>
      <PatchProductForm
        className="marginBorder"
        enableReinitialize
        onSubmit={submitHandler}
        initialValues={{
          title: title,
          description: description,
          status: status,
        }}
      />
    </>
  );
};

export default PatchProduct;
