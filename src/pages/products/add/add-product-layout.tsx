import { Button } from "@/components/ui/button";
import ProductCreationProvider from "@/providers/ProductCreationProvider";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import useProductCreation from "@/hooks/use-product-creation";
import { createProduct, getSingleProductBySlug, updateProduct } from "@/apis/services/product-services";
import useAuth from "@/hooks/use-auth";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import type { Product } from "@/types/product";
// import { convertUrlsToFiles } from "@/lib/utils";

type AddProductFormProps = {
  mode: "create" | "edit"
}

function AddProductForm({ mode = "create" }: AddProductFormProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);

  const {
    formMethods: { watch, getValues, setValue, handleSubmit, formState: { errors, isValid } },
    setMode,
    markFieldAsChanged,
    mode: contextMode,
    isFieldChanged
  } = useProductCreation();

  const form = getValues();
  watch();

  // Preq for Edit
  const { slug } = useParams();
  // const dispatch = useDispatch<AppDispatch>();

  // Set mode in context
  useEffect(() => {
    setMode(mode);
  }, [mode, setMode]);

  // Function to filter errors based on mode and changed fields
  const getFilteredErrors = () => {
    if (contextMode === "create") {
      return errors;
    }

    // In edit mode, only show errors for changed fields
    const filteredErrors: any = {};
    Object.entries(errors).forEach(([key, value]) => {
      if (isFieldChanged(key)) {
        filteredErrors[key] = value;
      }
    });
    return filteredErrors;
  };

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
      if (contextMode === "create") await createProduct(formData, user?.token!);
      if (contextMode === "edit") await updateProduct(product?.id!, formData, user?.token!);

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
    if (slug && contextMode === "edit") {
      getSingleProductBySlug(slug, user?.token!).then(async (data: Product) => {
        setProduct(data);
        console.log("Data", data);

        // Explicitly set each field to ensure type safety
        setValue("name", data.name);
        setValue("description", data.description);
        setValue("price", data.price);
        setValue("category", data.category);
        setValue("brand", data.brand);
        setValue("quantity", data.quantity);
        setValue("tags", data.tags || []);
        setValue("colors", data.colors || []);


        //! No get Old Images to render, to not uploaded many times
        // Convert image URLs to File objects and set in form
        // if (data.images && Array.isArray(data.images) && data.images.length > 0) {
        //   try {
        //     const imageFiles = await convertUrlsToFiles(data.images);
        //     setValue("images", imageFiles);
        //   } catch (error) {
        //     console.error('Error converting images:', error);
        //     // Set empty array if conversion fails
        //     setValue("images", []);
        //   }
        // } else {
        //   setValue("images", []);
        // }
      })
    }
  }, [])

  const filteredErrors = getFilteredErrors();

  return (
    <form
      className="max-w-2xl h-full mx-auto p-6 bg-white rounded-lg shadow space-y-6"
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <h2 className="text-2xl font-bold mb-4">{contextMode === "create" ? "Add New Product" : "Edit Product"}</h2>

      {/* Show form errors */}
      {Object.keys(filteredErrors).length > 0 && (
        <div className="p-4 bg-red-50 border border-red-200 rounded">
          <h3 className="text-red-800 font-semibold mb-2">
            {contextMode === "create" ? "Please fix the following errors:" : "Please fix the following errors in changed fields:"}
          </h3>
          <ul className="space-y-1">
            {Object.entries(filteredErrors).map(([key, value]: [string, any]) => (
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
        disabled={contextMode === "create" && !isValid}
      >
        {contextMode === "create" ? "Create Product" : "Update Product"}
      </Button>
    </form>
  );
}

export default function MutationProductLayout({ mode }: AddProductFormProps) {
  return (
    <ProductCreationProvider>
      <AddProductForm mode={mode} />
    </ProductCreationProvider>
  );
}