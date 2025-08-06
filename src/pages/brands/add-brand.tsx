import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAuth from "@/hooks/use-auth";
import ReactQuill from "react-quill";

import { toast } from "sonner";
import { useCreateBrandMutation, useGetBrandByIdQuery, useUpdateBrandMutation } from "@/app/redux/features/brands";

import "react-quill/dist/quill.snow.css";
import type { Brand } from "@/types/brands";

type AddBrandProps = {
  mode?: "create" | "edit";
}

export default function AddBrand({ mode = "create" }: AddBrandProps) {
  useAuth();

  const navigate = useNavigate();
  const { id } = useParams();
  const { data: currentBrand, isLoading: getBrandByIdLoading } = mode === "edit" ? useGetBrandByIdQuery({ _id: id! }) : {};
  const [createBrand, { isLoading: isCreateLoading }] = useCreateBrandMutation();
  const [updateBrand, { isLoading: isUpdateLoading }] = useUpdateBrandMutation();

  const [brand, setBrand] = useState<Omit<Omit<Brand, "_id">, "slug">>({
    name: "",
    description: ""
  });

  useEffect(() => {
    if (mode === "edit" && id) {
      if (!currentBrand) {
        toast.warning("There is no brand like this!");
        navigate("/brands");
        return;
      }

      setBrand(currentBrand);
    }
  }, [id])


  const handleBrandState = (key: string, value: string) => {
    setBrand((p) => ({ ...p, [key]: value }))
  }

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (mode === "create") {
      createBrand(brand).then((data) => {
        toast.success("Successfully Created brand");
      }).catch(error => {
        toast.error("Failed to create brand!")
      })
    } else {
      if (id) {
        updateBrand({ id, brand })
        toast.success("Successfully updated brand")
      }
    }

    navigate("/brands")
    console.log(brand)
  }

  if (mode === "edit" && getBrandByIdLoading) {
    console.log("????");
    toast.info("Fetching brand data right now...")
    return <h1>Please wait to get brand data</h1>
  }

  console.log("Brand data", brand)

  return (
    <div className="h-full container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{mode === "create" ? "Create" : "Edit"} New Brand</h1>

      <form className="space-y-4" onSubmit={onSubmit}>
        <div>
          <Label htmlFor="brand-name" className="block text-lg font-medium text-gray-700">
            Brand Name
          </Label>

          <Input
            name="brand-name"
            id="brand-name"
            value={brand.name}
            type="text"
            className="mt-1 p-2 block w-full bg-white border-gray-300 rounded-md shadow-sm focus:border-blue-500 outline-none"
            placeholder="Enter category name"
            onChange={(e) => handleBrandState("name", e.target.value)}
          />
        </div>
        {/* ./category name input */}
        <div>
          <Label htmlFor="brand-description" className="block text-lg font-medium text-gray-700">
            Brand Description
          </Label>


          <ReactQuill
            id="brand-description"
            className="h-1/2"
            value={brand.description}
            onChange={(value) => handleBrandState("description", value)}
          />
        </div>
        {/* ./category description input */}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          {mode === "create" ? "Add" : "Edit"} Brand
        </button>
      </form>
    </div>
  );
}
