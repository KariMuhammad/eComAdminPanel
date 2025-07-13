import { useContext } from "react";
import ProductCreationContext from "@/context/product-creation-context";

export default function useProductForm() {
  const context = useContext(ProductCreationContext);
  
  if (!context) {
    throw new Error("useProductForm must be used within ProductCreationProvider");
  }
  
  return context;
} 