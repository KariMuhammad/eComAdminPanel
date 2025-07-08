import type React from "react";
import { Step, Stepper } from "react-form-stepper";
import { Link } from "react-router-dom";
import { createProductSteps } from ".";

type CreateProductStepsComponentProps = {
  currentStep: number;
  // onStepChange: (stepId: string) => void;
};

export const CreateProductStepsComponent: React.FC<
  CreateProductStepsComponentProps
> = ({ currentStep = 1 }) => {
  return (
    <Stepper>
      {createProductSteps.map((step, idx) => (
        <Link to={step.url} key={step.id}>
          <Step
            index={idx}
            key={step.id}
            label={step.title}
            active={currentStep >= idx}
          />
        </Link>
      ))}
    </Stepper>
  );
};
