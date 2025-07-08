import ProductCreationContext from "@/context/product-creation-context";
import { useContext } from "react";

export default function useProductCreation() {
  const ctx = useContext(ProductCreationContext);

  if (!ctx)
    throw new Error(
      "useProductCreation must be used within ProductCreationProvider!"
    );

  console.log(ctx.form);
  return ctx;
}
