import type { RootState } from "@/app/redux/store";
import ListPage from "@/layouts/page-list";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "@/app/redux/store";
import { fetchBrands, type BrandStateType } from "@/app/redux/features/brands";

export default function BrandList() {
  const dispatch = useDispatch<AppDispatch>();

  const { brands } = useSelector<RootState, BrandStateType>(
    (store) => store.brands
  );

  useEffect(() => {
    dispatch(fetchBrands());
  }, []);

  console.log("brands", brands);

  return (
    <ListPage
      title="Brands"
      buttonLabel="Add Brand"
      buttonUrl="/brands/add"
      columns={["id", "image", "name", "description"]}
      data={brands}
      renderRow={(brand, index) => (
        <tr key={index}>
          <td>{index}</td>
          <td>{brand.image}</td>
          <td>{brand.name}</td>
          <td>{brand.description}</td>
        </tr>
      )}
    />
  );
}
