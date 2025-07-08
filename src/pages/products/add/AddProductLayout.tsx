import ProductCreationProvider from "@/providers/ProductCreationProvider";
import { Outlet } from "react-router-dom";

export default function AddProductLayout() {
  return (
    <ProductCreationProvider>
      <Outlet />
    </ProductCreationProvider>
  );
}
