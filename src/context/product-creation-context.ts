import React, { createContext } from "react";
import type { Product } from "@/types/product";

// React Hook Form
import { ADD_PRODUCT_INITIAL_STATE } from "@/constants";
import type { UseFormReturn } from "react-hook-form";
import type { z } from "zod";
import type { addProductSchema } from "@/schemas/add-product";
// ./React Hook Form

// Context Type
type ProductCreationContextType = {
  form: Product;
  setForm: React.Dispatch<React.SetStateAction<Product>>;
  resetForm: () => void;
  // Add react-hook-form methods
  formMethods: UseFormReturn<z.infer<typeof addProductSchema>>;
  // File upload handling
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
  imageUrls: string[];
  setImageUrls: React.Dispatch<React.SetStateAction<string[]>>;
};
// ./Context Type


const ProductCreationContext = createContext<ProductCreationContextType>({
  form: ADD_PRODUCT_INITIAL_STATE,
  setForm: () => {},
  resetForm: () => {},
  formMethods: {} as UseFormReturn<z.infer<typeof addProductSchema>>,
  images: [],
  imageUrls: [],
  setImages: () => {},
  setImageUrls: () => {}
});

export default ProductCreationContext;
