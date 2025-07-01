// pages/ProductsPage.tsx
import ListPage from "@/layouts/page-list";

type Product = {
  id: number;
  name: string;
  price: number;
};

const products: Product[] = [
  { id: 1, name: "Phone", price: 999 },
  { id: 2, name: "Laptop", price: 1500 },
];

export default function ProductsListPage() {
  return (
    <div className="h-full">
      <ListPage<Product>
        title="Products"
        buttonLabel="Add Product"
        buttonUrl="add-product"
        onClickButton={() => alert("Open Add Product Modal")}
        columns={["#", "Name", "Price", "Actions"]}
        data={products}
        renderRow={(product, index) => (
          <tr key={product.id} className="border-b text-sm">
            <td className="px-4 py-2">{index + 1}</td>
            <td className="px-4 py-2">{product.name}</td>
            <td className="px-4 py-2">${product.price}</td>
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
