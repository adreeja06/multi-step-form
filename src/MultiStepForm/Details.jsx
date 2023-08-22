import React, { useContext } from "react";
import { Formik } from "formik";
import { Button } from "antd";
import { Input } from "formik-antd";
import MultiStepFormContext from "./MultiStepFormContext";

const Details = () => {
  // get details, setDetails and next from the MultiStepFormContext
  const { details, setDetails, next } = useContext(MultiStepFormContext);

  return (
    <Formik
      // set the initial values of the form
      initialValues={details}
      // handle form submission
      onSubmit={(values) => {
        setDetails(values); // update the details in the context
        next(); // move to the next step
      }}
      // validate the form fields
      validate={(values) => {
        const errors = {};
        if (!values.name) errors.name = "Name is required";
        else if (!/^[a-zA-Z\s]+$/.test(values.name))
          errors.name = "Name should only contain alphabets and spaces";
        if (!values.username) errors.username = "Username is required";
        if (!values.email) errors.email = "Email is required";
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email))
          errors.email = "Invalid email address";
        if (/^[0-9]+$/.test(values.username))
          errors.username =
            "Username does not require numbers or special characters";
        return errors;
      }}
    >
      {({ handleSubmit, errors }) => (
        <div className={"details__wrapper"}>
          <div>
            <h2 className="review__header" style={{ textAlign: "center" }}>
              Enter Personal Details
            </h2>
          </div>
          <div className={`form__item ${errors.name && "input__error"}`}>
            <label>Name *</label>
            <Input name={"name"} />
            <p className={"error__feedback"}>{errors.name}</p>
          </div>
          <div className={`form__item ${errors.username && "input__error"}`}>
            <label>Username *</label>
            <Input name={"username"} />
            <p className={"error__feedback"}>{errors.username}</p>
          </div>
          <div className={`form__item ${errors.email && "input__error"}`}>
            <label>Email *</label>
            <Input name={"email"} />
            <p className={"error__feedback"}>{errors.email}</p>
          </div>
          <div
            className={"form__item button__items d-flex justify-content-end"}
          >
            <Button type={"primary"} onClick={handleSubmit}>
              Next
            </Button>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default Details;
