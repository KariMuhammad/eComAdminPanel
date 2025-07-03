import type React from "react";
import { Step, Stepper } from "react-form-stepper";
import { Link } from "react-router-dom";

export const createProductSteps = [
  {
    id: "product-details",
    url: "/products/add",
    title: "Product Details",
    description: "Enter the basic information about your product.",
  },
  {
    id: "product-description",
    url: "/products/add-description",
    title: "Product Description",
    description:
      "Provide a detailed description of your product, including features and benefits.",
  },
  {
    id: "shipping",
    url: "/products/add-shipping",
    title: "Shipping",
    description: "Configure shipping options and rates for your product.",
  },
];

type CreateProductStepsComponentProps = {
  currentStep: number;
  // onStepChange: (stepId: string) => void;
};

export const CreateProductStepsComponent: React.FC<
  CreateProductStepsComponentProps
> = ({ currentStep }) => {
  return (
    <Stepper>
      {createProductSteps.map((step, idx) => (
        <Link to={step.url} key={step.id}>
          <Step
            index={idx}
            key={step.id}
            id={step.id}
            label={step.title}
            active={currentStep === idx}
          />
        </Link>
      ))}
    </Stepper>
  );
};
