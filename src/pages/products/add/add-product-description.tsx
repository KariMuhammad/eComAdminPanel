import ErrorMessage from "@/components/shared/error-message";
import { CreateProductStepsComponent } from "@/constants/create-product-steps";
import useProductCreation from "@/hooks/use-product-creation";
import ReactQuill from "react-quill";
import { Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";

import "react-quill/dist/quill.snow.css";
export default function AddPoductDescription() {
  const { formMethods: { control, getValues, formState: { errors } } } = useProductCreation();
  const form = getValues();
  console.log(form);

  return (
    <div className="">
      <CreateProductStepsComponent currentStep={1} />
      <div className="space-y-2">
        <Label>Description</Label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <ReactQuill
              className="h-1/2"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <ErrorMessage message={errors.description?.message} />
      </div>
    </div>
  );
}
