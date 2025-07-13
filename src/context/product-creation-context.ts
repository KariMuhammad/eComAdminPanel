import { createContext } from "react";
import type { UseFormReturn } from "react-hook-form";
import type { z } from "zod";
import type { addProductSchema } from "@/schemas/add-product";
// ./React Hook Form

// Context Type
type ProductCreationContextType = {
  // Add react-hook-form methods
  formMethods: UseFormReturn<z.infer<typeof addProductSchema>>;
};
// ./Context Type


const ProductCreationContext = createContext<ProductCreationContextType>({
  formMethods: {} as UseFormReturn<z.infer<typeof addProductSchema>>,
});

export default ProductCreationContext;
