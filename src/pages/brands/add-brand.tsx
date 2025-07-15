import React, { useState } from "react";
import { createBrand } from "@/apis/services/brand-services";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAuth from "@/hooks/use-auth";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
export default function AddBrand() {
  const { user } = useAuth();
  const [brand, setBrand] = useState({ name: "", description: "" });
  const navigate = useNavigate();

  const handleBrandState = (key: string, value: string) => {
    setBrand((p) => ({ ...p, [key]: value }))
  }

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createBrand(brand, user?.token!).then((data) => {
      toast.success("Successfully Created brand");
      navigate("/brands")
    }).catch(error => {
      toast.error("Failed to create brand!")
    })
    console.log(brand)
  }

  return (
    <div className="h-full container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Brand</h1>

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
          Add Brand
        </button>
      </form>
    </div>
  );
}
