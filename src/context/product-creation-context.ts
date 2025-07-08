import { ADD_PRODUCT_INITIAL_STATE } from "@/constants";
import type { Product } from "@/types/product";
import React, { createContext } from "react";

type ProductCreationContextType = {
  form: Product;
  setForm: React.Dispatch<React.SetStateAction<Product>>;
  resetForm: () => void;
};

const ProductCreationContext = createContext<ProductCreationContextType>({
  form: ADD_PRODUCT_INITIAL_STATE,
  setForm: () => {},
  resetForm: () => {},
});

export default ProductCreationContext;
