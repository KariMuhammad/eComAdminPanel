import { CreateProductStepsComponent } from "@/constants/create-product-steps";
import useProductCreation from "@/hooks/use-product-creation";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function AddPoductDescription() {
  const { form } = useProductCreation();
  console.log(form);
  return (
    <div className="h-screen">
      <h2 className="text-2xl font-bold mb-4">
        Add Full Description for product
      </h2>

      <CreateProductStepsComponent currentStep={1} />

      <ReactQuill className="h-1/2" />
    </div>
  );
}
