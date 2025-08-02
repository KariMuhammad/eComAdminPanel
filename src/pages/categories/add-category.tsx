import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAuth from "@/hooks/use-auth";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";
import { useCreateCategoryMutation, useGetCategoryQuery, useUpdateCategoryMutation } from "@/app/redux/features/categories";
import { convertUrlToFile } from "@/lib/utils";

type AddCategoryProps = {
  mode?: "create" | "edit";
}

export default function AddCategory({ mode = "create" }: AddCategoryProps) {
  const { id } = useParams();

  const { user: { token } } = useAuth();
  const { data: categoryById, isLoading: categoryLoading } = id ? useGetCategoryQuery({ id, token }) : {};

  const [createCategory, { isLoading: isCreating }] = useCreateCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation();

  const [category, setCategory] = useState<{
    name: string;
    description: string;
    image: File | null
  }>({ name: "", description: "", image: null });

  useEffect(() => {
    if (mode === "edit" && id && categoryById) {
      setCategory({
        name: categoryById.name,
        description: categoryById.description,
        image: null
      })

      if (!categoryById.image) return;

      const loadingImage = toast.info("Loading category image...")
      convertUrlToFile(categoryById.image, "category-image").then(img => {
        console.log("Image", img);

        setCategory((p) => ({ ...p, image: img }));
        toast.dismiss(loadingImage)
      }).catch(error => {
        console.log("Error in converting url to file")
      })
    }
  }, [mode, categoryLoading])

  const navigate = useNavigate();

  const handleCategoryState = (key: string, value: any) => {
    setCategory((p) => ({
      ...p,
      [key]: value
    }))
  }

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    // Add text fields
    formData.append("name", category.name);
    formData.append("description", category.description);

    // Add image if it exists
    if (category.image) {
      formData.append("image", category.image);
    } else {
      return toast.error("Must upload one image");
    }

    if (mode === "create") {
      createCategory({ data: formData, token: token }).then((data) => {
        toast.success("Successfully create category");
        navigate("/categories");
      }).catch(error => {
        toast.error(error);
      });
    }

    if (mode === "edit" && id) {
      updateCategory({ id, updatedData: formData, token }).then(() => {
        toast.success("Successfully updated category");
        navigate("/categories")
      }).catch(error => {
        toast.error(error)
      })
    }

    console.log("Category ", category);
  }

  if (isCreating)
    toast.info("Creating Category...");

  return (
    <div className="h-full container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{mode === "create" ? "Add New" : "Edit"} Category</h1>

      <form className="space-y-4" onSubmit={onSubmit}>
        <div>
          <Label htmlFor="category-name" className="block text-lg font-medium text-gray-700">
            Category Name
          </Label>
          <Input
            id="category-name"
            name="category-name"
            value={category.name}
            type="text"
            className="mt-1 p-2 block w-full bg-white border-gray-300 rounded-md shadow-sm focus:border-blue-500 outline-none"
            placeholder="Enter category name"
            onChange={(e) => handleCategoryState("name", e.target.value)}
          />
        </div>
        {/* ./category name input */}

        <div>
          <Label htmlFor="category-description" className="block text-lg font-medium text-gray-700">
            Category Description
          </Label>


          <ReactQuill
            id="category-description"
            className="h-1/2"
            value={category.description}
            onChange={(value) => handleCategoryState("description", value)}
          />
        </div>
        {/* ./category description input */}

        <div>
          <Label>
            Upload Image
          </Label>

          <Input
            type="file"
            accept="image/*"
            className="w-full"
            onChange={(e) => {
              const newFile = e.target.files?.[0];
              if (!newFile) return;
              handleCategoryState("image", newFile)
            }}
          />
          {category.image && (
            <img
              src={URL.createObjectURL(category.image)}
              alt={`Preview Category Image`}
              className="w-16 h-16 object-cover rounded border"
            />
          )}
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          {mode === "create" ? "Add" : "Edit"} Category
        </button>
      </form>
    </div>
  );
}
