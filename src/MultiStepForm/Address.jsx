import React, { useContext } from "react";
import { Formik } from "formik";
import { Button } from "antd";
import { Input } from "formik-antd";
import MultiStepFormContext from "./MultiStepFormContext";

// Define a component named "Details"
const Details = () => {
  // Get "address", "setAddress", "next", and "prev" from MultiStepFormContext using useContext hook
  const { address, setAddress, next, prev } = useContext(MultiStepFormContext);

  // Render a Formik form that manages state, validation, and submission of form data
  return (
    <Formik
      // Set initial values of the form fields to "address"
      initialValues={address}
      // Define what happens when the form is submitted
      onSubmit={(values) => {
        // Update the "address" state with the submitted form data
        setAddress(values);
        // Move to the next step in the multi-step form
        next();
      }}
      validate={(values) => {
        const errors = {};
        if (!values.address1) errors.address1 = "Address is required";
        else if (!/^[a-zA-Z0-9\s]*$/.test(values.address1))
          errors.address1 =
            "Address must contain only letters, digits, and spaces";
        if (!values.city) errors.city = "City is required";
        else if (!/^[a-zA-Z\s]*$/.test(values.city))
          errors.city = "City must contain only letters and spaces";
        if (!values.country) errors.country = "Country is required";
        else if (!/^[a-zA-Z\s]*$/.test(values.country))
          errors.country = "Country must contain only letters and spaces";
        if (!values.state) errors.state = "State is required";
        else if (!/^[a-zA-Z\s]*$/.test(values.state))
          errors.state = "State must contain only letters and spaces";
        if (!values.phone) errors.phone = "Phone number is required";
        else if (!/^(\+?\d{1,3}\s?)?(\d{10})$/.test(values.phone))
          errors.phone =
            "Phone number must be 10 digits with an optional country code";
        // Return any validation errors that occur
        return errors;
      }}
    >
      {({ handleSubmit, errors }) => {
        // Render the form using the Ant Design framework
        return (
          <div className={"details__wrapper"}>
            <div>
              <h2 className="review__header" style={{ textAlign: "center" }}>
                Enter Address Details
              </h2>
            </div>
            <div className={`form__item ${errors.address1 && "input__error"}`}>
              <label>Address *</label>
              <Input name={"address1"} />
              <p className={"error__feedback"}>{errors.address1}</p>
            </div>
            <div className={`form__item ${errors.city && "input__error"}`}>
              <label>City *</label>
              <Input name={"city"} />
              <p className={"error__feedback"}>{errors.city}</p>
            </div>
            <div className={`form__item ${errors.country && "input__error"}`}>
              <label>Country *</label>
              <Input name={"country"} />
              <p className={"error__feedback"}>{errors.country}</p>
            </div>
            <div className={`form__item ${errors.state && "input__error"}`}>
              <label>State *</label>
              <Input name={"state"} />
              <p className={"error__feedback"}>{errors.state}</p>
            </div>
            <div className={`form__item ${errors.phone && "input__error"}`}>
              <label>Phone *</label>
              <Input name={"phone"} />
              <p className={"error__feedback"}>{errors.phone}</p>
            </div>
            <div
              className={
                "form__item button__items d-flex justify-content-between"
              }
            >
              {/* Render a "Back" button that moves to the previous step in the form */}
              <Button type={"default"} onClick={prev}>
                Back
              </Button>
              {/* Render a "Next" button that submits the form data and moves to the next step in the form */}
              <Button type={"primary"} onClick={handleSubmit}>
                Next
              </Button>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default Details;
