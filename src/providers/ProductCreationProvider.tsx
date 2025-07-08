import { useState, type ReactNode } from "react";
import type { Product } from "@/types/product";
import ProductCreationContext from "@/context/product-creation-context";
import { ADD_PRODUCT_INITIAL_STATE } from "@/constants";

export default function ProductCreationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [form, setForm] = useState<Product>(ADD_PRODUCT_INITIAL_STATE);
  const resetForm = () => setForm(ADD_PRODUCT_INITIAL_STATE);

  return (
    <ProductCreationContext.Provider value={{ form, setForm, resetForm }}>
      {children}
    </ProductCreationContext.Provider>
  );
}
