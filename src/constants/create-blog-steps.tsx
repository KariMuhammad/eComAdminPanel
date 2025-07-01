import type React from "react";
import { Step, Stepper } from "react-form-stepper";
import { Link } from "react-router-dom";

export const createBlogSteps = [
  {
    label: "Basic Info",
    url: "/add-blog",
    description: "Enter the basic information about your blog post.",
  },
  {
    label: "Upload Image",
    url: "/add-blog/upload-image",
    description: "Upload a featured image for your blog post.",
  },
  {
    label: "Publish & Finish",
    url: "/add-blog/publish",
    description: "Review and publish your blog post.",
  },
];

type CreateBlogStepsComponentProps = {
  currentStep?: number;
};

export const CreateBlogStepsComponent: React.FC<
  CreateBlogStepsComponentProps
> = ({ currentStep = 0 }) => (
  <Stepper>
    {createBlogSteps.map((step, index) => (
      <Link to={step.url || "/add-blog"} key={index}>
        <Step
          key={index}
          label={step.label}
          index={index}
          active={index === currentStep}
        />
      </Link>
    ))}
  </Stepper>
);
