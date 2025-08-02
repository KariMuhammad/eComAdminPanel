import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// pages/ProductsPage.tsx
import {
  deleteProduct as deleteProductThunk,
  fetchProducts
} from "@/app/redux/features/products";
import type { AppDispatch, RootState } from "@/app/redux/store";
import useAuth from "@/hooks/use-auth";
import ListPage from "@/layouts/page-list";
import type { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Eye } from "lucide-react";

export default function ProductsListPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAuth();
  const { products, pagination } = useSelector((state: RootState) => state.products);
  // Local state for current page
  const [page, setPage] = useState(1);

  const deleteProduct = (productId: string, token: string) => {
    dispatch(deleteProductThunk({ id: productId, token }))
  }

  useEffect(() => {
    if (user?.token && !products.length) {
      dispatch(fetchProducts({ token: user.token, page }) as any);
    }
  }, [dispatch, user, page]);

  if (!pagination) return null;

  return (
    <div className="h-full">
      <ListPage<Product>
        title="Products"
        buttonLabel="Add Product"
        buttonUrl="add/basic-info"
        columns={["#", "image", "name", "price", "actions"]}
        data={products}
        renderRow={(product, index) => (
          <tr key={index} className="border-b text-sm">
            <td className="px-4 py-2">{index + 1}</td>
            <td className="px-4 py-2">
              <img
                src={product.images[0].url}
                alt={product.name}
                className="w-12 h-12 object-cover rounded-md"
              />
            </td>
            <td className="px-4 py-2">{product.name}</td>
            <td className="px-4 py-2">${product.price.toFixed(2)}</td>
            <td className="px-4 py-2">
              <div className="flex items-center justify-center">
                <button className="bg-gray-600 text-white py-1 px-2 rounded-md hover:bg-gray-700 mr-2">
                  <Link to={`/products/view/${product.slug}`}>
                    <Eye size="1.2rem" />
                  </Link>
                </button>

                <button className="bg-blue-600 text-white py-1 px-2 rounded-md hover:bg-blue-700 mr-2">
                  <Link to={`/products/edit/${product.slug}/basic-info`}>Edit</Link>
                </button>
                <button
                  className="bg-red-600 text-white py-1 px-2 rounded-md hover:bg-red-700"
                  onClick={() => deleteProduct(product._id!, user?.token!)}
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        )}
      />
      {/* Pagination Controls */}
      <div className="flex justify-end items-center gap-2 mt-7">
        <Button
          disabled={!pagination.prevPage}
          className="bg-black text-white"
          onClick={() => setPage(pagination?.prevPage ?? 1)}
        >
          Previous
        </Button>
        <span className="mx-3x">Page {pagination.page}</span>
        <Button
          disabled={!pagination.nextPage}
          className="bg-black text-white"
          onClick={() => setPage(pagination?.nextPage ?? 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
