import { Button } from "@/components/ui/button";
import ProductCreationProvider from "@/providers/ProductCreationProvider";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import useProductCreation from "@/hooks/use-product-creation";
import { createProduct, getSingleProductBySlug } from "@/apis/services/product-services";
import useAuth from "@/hooks/use-auth";
import { toast } from "sonner";
import { useEffect } from "react";

type AddProductFormProps = {
  mode?: "create" | "edit"
}

function AddProductForm({ mode = "create" }: AddProductFormProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { formMethods: { watch, getValues, handleSubmit, formState: { errors, isValid } } } = useProductCreation();
  watch();
  const form = getValues();

  // Preq for Edit
  const { slug } = useParams();
  // const dispatch = useDispatch<AppDispatch>();

  const onSubmit = async (data: any) => {
    console.log("Form submitted:", data);
    // console.log("Files to upload:", images);

    // Create FormData for file upload
    const formData = new FormData();

    form.tags.forEach((tag) => formData.append("tags", tag))
    form.images.forEach((image) => formData.append("images", image))

    // Add files
    // images.forEach((file, index) => {
    //   if (file && file.size > 0) {
    //     formData.append('images', file);
    //   }
    // });

    // Add other form data
    Object.keys(data).forEach(key => {
      if (key === "tags" || key === "images") return;

      if (key === "colors") {
        formData.append(key, JSON.stringify(data[key]));
      } else {
        formData.append(key, data[key]);
      }
    });

    // Handle form submission with FormData
    try {
      console.log("FormData", formData)
      await createProduct(formData, user?.token!);
      toast("Successfully created product");
      navigate("/products");
    } catch (error) {
      toast("Failed to create product");
    }
  };

  const onError = (errors: any) => {
    window.scrollTo({ top: 0 })
    console.log("Form errors:", errors);
  };

  useEffect(() => {
    if (slug && mode === "edit") {
      getSingleProductBySlug(slug, user?.token!).then(data => {

      })
    }
  }, [])

  return (
    <form
      className="max-w-2xl h-full mx-auto p-6 bg-white rounded-lg shadow space-y-6"
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <h2 className="text-2xl font-bold mb-4">{mode === "create" ? "Add New Product" : "Edit Product"}</h2>

      {/* Show form errors */}
      {Object.keys(errors).length > 0 && (
        <div className="p-4 bg-red-50 border border-red-200 rounded">
          <h3 className="text-red-800 font-semibold mb-2">Please fix the following errors:</h3>
          <ul className="space-y-1">
            {Object.entries(errors).map(([key, value]: [string, any]) => (
              <li key={key} className="text-red-700 text-sm">
                {key}: {Array.isArray(value) ? value.map((err: any) => Object.values(err).map((error: any) => error.message)).join(",\t") : value?.message}
              </li>
            ))}
          </ul>
        </div>
      )}

      <Outlet />

      <Button
        type="submit"
        className="w-full mt-4 bg-black text-white hover:bg-black/80 dark:bg-white dark:text-purple-500"
        disabled={!isValid}
      >
        Create Product
      </Button>
    </form>
  );
}

export default function AddProductLayout() {
  return (
    <ProductCreationProvider>
      <AddProductForm />
    </ProductCreationProvider>
  );
}
