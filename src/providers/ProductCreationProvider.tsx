import type React from "react";
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
  children: React.ReactNode;
}) {
  // Initialize react-hook-form
  const formMethods = useForm<z.infer<typeof addProductSchema>>({
    resolver: zodResolver(addProductSchema),
    defaultValues: ADD_PRODUCT_INITIAL_STATE,
    mode: "onChange", // Enable real-time validation
  });

  return (
    <ProductCreationContext.Provider value={{
      formMethods,
    }}>
      {children}
    </ProductCreationContext.Provider>
  );
}
