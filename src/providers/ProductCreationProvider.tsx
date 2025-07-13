import { useState, type ReactNode } from "react";
import type { Product } from "@/types/product";
import ProductCreationContext from "@/context/product-creation-context";

// React Hook Form
import { ADD_PRODUCT_INITIAL_STATE } from "@/constants";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addProductSchema } from "@/schemas/add-product";
import type { z } from "zod";
// ./React Hook Form

export default function ProductCreationProvider({
  children,
}: {
  children: ReactNode;
}) {
  // TODO: Product Type sholud replaced with another interface for creation product
  const [form, setForm] = useState<Product>(ADD_PRODUCT_INITIAL_STATE);
  const resetForm = () => setForm(ADD_PRODUCT_INITIAL_STATE);

  // File upload state
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  // Initialize react-hook-form
  const formMethods = useForm<z.infer<typeof addProductSchema>>({
    resolver: zodResolver(addProductSchema),
    defaultValues: ADD_PRODUCT_INITIAL_STATE,
    mode: "onChange", // Enable real-time validation
  });

  return (
    <ProductCreationContext.Provider value={{
      form,
      setForm,
      resetForm,
      formMethods,

      // Handling Upload Images
      images,
      setImages,
      imageUrls,
      setImageUrls
    }}>
      {children}
    </ProductCreationContext.Provider>
  );
}
