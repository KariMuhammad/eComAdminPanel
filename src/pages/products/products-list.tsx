// pages/ProductsPage.tsx
import {
  fetchProducts,
  type ProductState,
} from "@/app/redux/features/products";
import type { AppDispatch, RootState } from "@/app/redux/store";
import useAuth from "@/hooks/use-auth";
import ListPage from "@/layouts/page-list";
import type { Product } from "@/types/product";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ProductsListPage() {
  const { products } = useSelector<RootState, ProductState>(
    (state) => state.products
  );
  const { user } = useAuth();
  const dispatch = useDispatch<AppDispatch>();

  console.log("ProductsListPage", products);

  useEffect(() => {
    dispatch(fetchProducts(user!.token));
  }, []);

  return (
    <div className="h-full">
      <ListPage<Product>
        title="Products"
        buttonLabel="Add Product"
        buttonUrl="add-product"
        onClickButton={() => alert("Open Add Product Modal")}
        columns={["#", "image", "name", "price", "actions"]}
        data={products}
        renderRow={(product, index) => (
          <tr key={index} className="border-b text-sm">
            <td className="px-4 py-2">{index + 1}</td>
            <td className="px-4 py-2">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-12 h-12 object-cover rounded-md"
              />
            </td>
            <td className="px-4 py-2">{product.name}</td>
            <td className="px-4 py-2">${product.price.toFixed(2)}</td>
            <td className="px-4 py-2">
              <button className="bg-blue-600 text-white py-1 px-2 rounded-md hover:bg-blue-700 mr-2">
                Edit
              </button>
              <button className="bg-red-600 text-white py-1 px-2 rounded-md hover:bg-red-700">
                Delete
              </button>
            </td>
          </tr>
        )}
      />
    </div>
  );
}
