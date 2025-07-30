import type React from "react";
import ProductCreationContext from "@/context/product-creation-context";

// React Hook Form
import { ADD_PRODUCT_INITIAL_STATE } from "@/constants";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addProductSchema } from "@/schemas/add-product";
import { z } from "zod";
import { useState, useCallback } from "react";
// ./React Hook Form

export default function ProductCreationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // State for mode and changed fields tracking
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [changedFields, setChangedFields] = useState<Set<string>>(new Set());

  // Function to mark a field as changed
  const markFieldAsChanged = useCallback((fieldName: string) => {
    setChangedFields(prev => new Set(prev).add(fieldName));
  }, []);

  // Function to check if a field has been changed
  const isFieldChanged = useCallback((fieldName: string) => {
    return changedFields.has(fieldName);
  }, [changedFields]);

  // Custom resolver for conditional validation
  const conditionalResolver = useCallback((data: any, context: any, options: any) => {
    if (mode === "create") {
      // In create mode, validate all fields normally
      return zodResolver(addProductSchema)(data, context, options);
    } else {
      // In edit mode, only validate changed fields
      const changedFieldsArray = Array.from(changedFields);

      if (changedFieldsArray.length === 0) {
        // If no fields changed, return success
        return { values: data, errors: {} };
      }

      // Create a partial schema with only changed fields
      const partialSchema: any = {};
      changedFieldsArray.forEach(field => {
        if (addProductSchema.shape[field as keyof typeof addProductSchema.shape]) {
          partialSchema[field] = addProductSchema.shape[field as keyof typeof addProductSchema.shape];
        }
      });

      // Validate only changed fields
      const partialZodSchema = z.object(partialSchema);
      return zodResolver(partialZodSchema)(data, context, options);
    }
  }, [mode, changedFields]);

  // Initialize react-hook-form
  const formMethods = useForm<z.infer<typeof addProductSchema>>({
    resolver: conditionalResolver,
    defaultValues: ADD_PRODUCT_INITIAL_STATE,
    mode: "onChange", // Enable real-time validation
  });

  return (
    <ProductCreationContext.Provider value={{
      formMethods,
      mode,
      setMode,
      changedFields,
      markFieldAsChanged,
      isFieldChanged,
    }}>
      {children}
    </ProductCreationContext.Provider>
  );
}
