import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAuth from "@/hooks/use-auth";

import "react-quill/dist/quill.snow.css";

type AddBlogCategoryProps = {
    mode?: "create" | "edit";
}

import { type CreateBlogCategoryRequest, useCreateBlogCategoryMutation, useGetBlogCategoryByIdQuery, useUpdateBlogCategoryMutation } from "@/app/redux/features/blog-categories";
import { convertUrlToFile } from "@/lib/utils";
export default function AddBlogCategory({ mode = "create" }: AddBlogCategoryProps) {
    useAuth();
    const navigate = useNavigate();

    const { id } = useParams();

    const { data: currentBlogCategory } = useGetBlogCategoryByIdQuery({ _id: id! }, { skip: !id });
    const [blogCategory, setBlogCategory] = useState<CreateBlogCategoryRequest>({ name: "", description: "", image: null })

    const handleCategoryState = (key: string, value: any) => {
        setBlogCategory((p) => ({
            ...p,
            [key]: value
        }))
    }

    const [createBlogCategory] = useCreateBlogCategoryMutation();
    const [updateBlogCategory] = useUpdateBlogCategoryMutation();

    const onSubmit: React.FormEventHandler<HTMLFormElement> = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        if (!blogCategory.image) return;

        formData.append("name", blogCategory.name);
        formData.append("description", blogCategory.description);
        formData.append("image", blogCategory.image);

        if (mode === "create") {
            createBlogCategory(formData).then(() => {
                toast.success("Successfully create category");
                navigate("/blog-category");
            }).catch(error => {
                toast.error(error);
            });
        }

        if (mode === "edit" && id && currentBlogCategory) {
            updateBlogCategory({ id, data: formData }).then(_ => {
                toast.success("Successfully update category");
                navigate("/blog-category");
            }).catch(error => {
                toast.error(error);
            });
        }

        console.log(blogCategory);
    }

    useEffect(() => {
        if (mode === "edit" && id && currentBlogCategory) {
            setBlogCategory({
                name: currentBlogCategory.name,
                description: currentBlogCategory.description,
                image: null
            });

            if (!currentBlogCategory.image) return;

            convertUrlToFile(currentBlogCategory?.image, "blog-category-image").then((img) => {
                setBlogCategory((p) => ({ ...p, image: img }))
            })
        }
    }, [id, currentBlogCategory])

    return (
        <div className="h-full container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">{mode === "create" ? "Add New" : "Edit"} Blog Category</h1>

            <form className="space-y-4" onSubmit={onSubmit}>
                <div>
                    <Label htmlFor="category-name" className="block text-lg font-medium text-gray-700">
                        Category Name
                    </Label>
                    <Input
                        id="category-name"
                        name="category-name"
                        value={blogCategory.name}
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
                        value={blogCategory.description}
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
                    {blogCategory.image && (
                        <img
                            src={URL.createObjectURL(blogCategory.image)}
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
