import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "@/app/redux/features/categories";

import ListPage from "@/layouts/page-list";
import useAuth from "@/hooks/use-auth";
import { Link } from "react-router-dom";
import { useModal } from "@/hooks/useModal";
import { ModalSizes } from "@/types";
import { DeleteModal } from "@/components/modal-templates/DeleteModal";
export default function CategoryList() {
  useAuth();

  const { openModal } = useModal();

  const { isLoading, isError, data: categories, error } = useGetCategoriesQuery({ page: 1, limit: 10 });
  const [deleteCategory, { isLoading: isDeleting }] = useDeleteCategoryMutation();

  const handleDelete = (id: string) => {
    openModal({
      title: "Delete Confirm",
      size: ModalSizes.md,
      children: <DeleteModal onConfirm={() => deleteCategory({ id })} />
    });
  }

  console.log("categories", categories);
  console.log("Error", error);

  return (
    <>
      {isLoading && (<h2>Loading...</h2>)}
      {isError && (<h2>Error occured!</h2>)}

      {!isLoading && !isError && (
        <ListPage
          title="Categories"
          buttonLabel="Add Category"
          buttonUrl="/categories/add"
          columns={["id", "image", "name", "description", "count", "actions"]}
          data={categories?.categories || []}
          renderRow={(category, index) => (
            <tr key={index}>
              <td>{index}</td>
              <td>
                <img className="w-16 object-contain" src={category.image} />
              </td>
              <td>{category.name}</td>
              <td className="line-clamp-2">
                <div dangerouslySetInnerHTML={{ __html: category.description }} />
              </td>
              <td>{category.count}</td>
              <td className="px-4 py-2">
                <div className="flex items-center justify-center">
                  <button className="bg-gray-600 text-white py-1 px-2 rounded-md hover:bg-gray-700 mr-2">
                    {/* <Link to={`/products/view/${product.slug}`}>
                      <Eye size="1.2rem" />
                    </Link> */}
                  </button>

                  <button className="bg-blue-600 text-white py-1 px-2 rounded-md hover:bg-blue-700 mr-2">
                    <Link to={`/categories/edit/${category._id}`}>Edit</Link>
                  </button>

                  <button
                    className="bg-red-600 text-white py-1 px-2 rounded-md hover:bg-red-700"
                    onClick={() => handleDelete(category._id)}
                  >
                    Delete
                  </button>
                </div>
              </td>

            </tr>
          )}
        />
      )}
    </>
  );
}
