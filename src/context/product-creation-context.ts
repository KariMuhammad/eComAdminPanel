import { createContext } from "react";
import type { UseFormReturn } from "react-hook-form";
import type { z } from "zod";
import type { addProductSchema } from "@/schemas/add-product";
// ./React Hook Form

// Context Type
type ProductCreationContextType = {
  // Add react-hook-form methods
  formMethods: UseFormReturn<z.infer<typeof addProductSchema>>;
  // Add mode and changed fields tracking
  mode: "create" | "edit";
  setMode: (mode: "create" | "edit") => void;
  changedFields: Set<string>;
  markFieldAsChanged: (fieldName: string) => void;
  isFieldChanged: (fieldName: string) => boolean;
};
// ./Context Type


const ProductCreationContext = createContext<ProductCreationContextType>({
  formMethods: {} as UseFormReturn<z.infer<typeof addProductSchema>>,
  mode: "create",
  setMode: () => {},
  changedFields: new Set(),
  markFieldAsChanged: () => {},
  isFieldChanged: () => false,
});

export default ProductCreationContext;
