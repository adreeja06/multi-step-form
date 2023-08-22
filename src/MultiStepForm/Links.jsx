import React, { useContext } from "react";
import { Formik } from "formik";
import { Button } from "antd";
import { Input } from "formik-antd";
import MultiStepFormContext from "./MultiStepFormContext";

// Component for the Links page of the form
const Links = () => {
  // Retrieve links details and state setters from context
  const { linksDetails, setLinksDetails, next, prev } = useContext(
    MultiStepFormContext
  );

  // Regular expression for validating URL formats
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

  return (
    <Formik
      // Initialize the form with linksDetails
      initialValues={linksDetails}
      // Set linksDetails with form values and move to next step on form submission
      onSubmit={(values) => {
        setLinksDetails(values);
        next();
      }}
      // Form validation rules
      validate={(values) => {
        const errors = {};
        if (!values.portfolio) errors.portfolio = "Portfolio link is required";
        else if (!urlRegex.test(values.portfolio))
          errors.portfolio = "Invalid portfolio link";

        if (!values.github) errors.github = "Github link is required";
        else if (!urlRegex.test(values.github))
          errors.github = "Invalid Github link";

        if (!values.website) errors.website = "Website link is required";
        else if (!urlRegex.test(values.website))
          errors.website = "Invalid website link";

        return errors;
      }}
    >
      {({ handleSubmit, errors }) => {
        return (
          <div className={"details__wrapper"}>
            <div>
              <h2 className="review__header" style={{ textAlign: "center" }}>
                Enter Website Details
              </h2>
            </div>
            {/* Portfolio Link input */}
            <div className={`form__item ${errors.portfolio && "input__error"}`}>
              <label>Portfolio Link *</label>
              <Input name={"portfolio"} />
              <p className={"error__feedback"}>{errors.portfolio}</p>
            </div>
            {/* Github Link input */}
            <div className={`form__item ${errors.github && "input__error"}`}>
              <label>Github Link *</label>
              <Input name={"github"} />
              <p className={"error__feedback"}>{errors.github}</p>
            </div>
            {/* Website Link input */}
            <div className={`form__item ${errors.website && "input__error"}`}>
              <label>Website Link *</label>
              <Input name={"website"} />
              <p className={"error__feedback"}>{errors.website}</p>
            </div>
            {/* Back and Next buttons */}
            <div
              className={
                "form__item button__items d-flex justify-content-between"
              }
            >
              <Button type={"default"} onClick={prev}>
                Back
              </Button>
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

export default Links;
