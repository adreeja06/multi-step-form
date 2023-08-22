import React, { useState, useEffect } from "react";
import { Steps } from "antd";
import { Provider } from "./MultiStepFormContext";
import Details from "./Details";
import Address from "./Address";
import Review from "./Review";
import Links from "./Links";
import Save from "./Save";
// Destructuring Steps component from antd
const { Step } = Steps;

// Initial state values for user details, address details and links details
const detailsInitialState = {
  name: "",
  username: "",
  email: ""
};

const addressInitialState = {
  address1: "",
  city: "",
  country: "",
  state: "",
  phone: ""
};

const linksDetailsInitialState = {
  portfolio: "",
  github: "",
  website: ""
};

// Main component
const MultiStepForm = () => {
  // Initializing state for user details, address details, links details and current step
  const [details, setDetails] = useState(
    JSON.parse(localStorage.getItem("details")) || detailsInitialState
  );
  const [address, setAddress] = useState(
    JSON.parse(localStorage.getItem("address")) || addressInitialState
  );
  const [linksDetails, setLinksDetails] = useState(
    JSON.parse(localStorage.getItem("linksDetails")) || linksDetailsInitialState
  );
  const [currentStep, setCurrentStep] = useState(0);

  // Save state values to localStorage
  useEffect(() => {
    localStorage.setItem("details", JSON.stringify(details));
    localStorage.setItem("address", JSON.stringify(address));
    localStorage.setItem("linksDetails", JSON.stringify(linksDetails));
  }, [details, address, linksDetails]);

  // Function to navigate to the next step
  const next = () => {
    if (currentStep === 4) {
      // Resetting state values and going back to the first step after submitting the form
      setCurrentStep(0);
      setDetails(detailsInitialState);
      setAddress(addressInitialState);
      setLinksDetails(linksDetailsInitialState);
      localStorage.removeItem("details");
      localStorage.removeItem("address");
      localStorage.removeItem("linksDetails");
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  // Function to navigate to the previous step
  const prev = () => setCurrentStep(currentStep - 1);

  return (
    // Providing state values to the MultiStepFormContext provider
    <Provider
      value={{
        details,
        setDetails,
        next,
        prev,
        address,
        setAddress,
        linksDetails,
        setLinksDetails
      }}
    >
      <Steps current={currentStep}>
        <Step title={"Personal details"} />
        <Step title={"Address details"} />
        <Step title={"Website Details"} />
        <Step title={"Review"} />
        <Step title={"Confirm"} />
      </Steps>
      {/* Rendering current step */}
      <main>{renderStep(currentStep)}</main>
    </Provider>
  );
};

// Function to render current step
const renderStep = (step) => {
  switch (step) {
    case 0:
      return <Details />;
    case 1:
      return <Address />;
    case 2:
      return <Links />;
    case 3:
      return <Review />;
    case 4:
      return <Save />;
    default:
      return null;
  }
};

export default MultiStepForm;
