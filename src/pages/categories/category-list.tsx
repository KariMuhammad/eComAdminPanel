import {
  fetchCategories,
  type CategoryStateType,
} from "@/app/redux/features/categories";
import type { RootState } from "@/app/redux/store";
import ListPage from "@/layouts/page-list";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "@/app/redux/store";
export default function CategoryList() {
  const dispatch = useDispatch<AppDispatch>();

  const { categories } = useSelector<RootState, CategoryStateType>(
    (store) => store.categories
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  console.log("categories", categories);

  return (
    <ListPage
      title="Categories"
      buttonLabel="Add Category"
      buttonUrl="/categories/add"
      columns={["id", "image", "name", "description", "count"]}
      data={categories}
      renderRow={(category, index) => (
        <tr key={index}>
          <td>{index}</td>
          <td>
            <img className="w-16 object-contain" src={category.image} />
          </td>
          <td>{category.name}</td>
          <td>{category.description}</td>
          <td>{category.count}</td>
        </tr>
      )}
    />
  );
}
