import ListPage from "@/layouts/page-list";
import { useDeleteBrandMutation, useGetBrandsQuery } from "@/app/redux/features/brands";
import { Button } from "@/components/ui/button";
import { EditIcon, TrashIcon } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { useModal } from "@/hooks/useModal";
import { ModalSizes } from "@/types";
import { DeleteModal } from "@/components/modal-templates/DeleteModal";
import type { Brand } from "@/types/brands";

export default function BrandList() {

  const { openModal } = useModal();

  const { data, isLoading, isSuccess } = useGetBrandsQuery();

  const [deleteBrand, { isLoading: isLoadingDelete }] = useDeleteBrandMutation();

  const handleDelete = ({ _id }: Pick<Brand, "_id">) => {
    openModal({
      title: "Delete Confirm",
      size: ModalSizes.sm,
      children: <DeleteModal onConfirm={() => deleteBrand({ _id })} />
    })
  }

  const brands = data || [];

  console.log("brands", brands);

  if (isLoadingDelete)
    toast.warning("Deleting brand...⚠️")

  return (
    <ListPage
      title="Brands"
      buttonLabel="Add Brand"
      buttonUrl="/brands/add"
      columns={["id", "image", "name", "description", "actions"]}
      data={brands}
      renderRow={(brand, index) => (
        <tr key={index}>
          <td>{index}</td>
          <td>{brand.image}</td>
          <td>{brand.name}</td>
          <td><div dangerouslySetInnerHTML={{ __html: brand.description }} /></td>
          <td>
            <Link to={`/brands/edit/${brand._id}`}>
              <Button variant="outline" size="sm">
                <EditIcon />
              </Button>
            </Link>
            <Button variant="outline" size="sm" onClick={() => handleDelete({ _id: brand._id })}>
              <TrashIcon />
            </Button>
          </td>
        </tr>
      )}
    />
  );
}
