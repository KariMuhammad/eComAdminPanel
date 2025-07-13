import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";
import { CreateProductStepsComponent } from "@/constants/create-product-steps";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "@/components/shared/error-message";
import useProductCreation from "@/hooks/use-product-creation";

import {
  fetchCategories,
  type CategoryStateType,
} from "@/app/redux/features/categories";
import type { AppDispatch, RootState } from "@/app/redux/store";
import { fetchBrands, type BrandStateType } from "@/app/redux/features/brands";


export default function AddProductInfo() {
  // Get All Categories & Brands From My Backend API
  const { categories } = useSelector<RootState, CategoryStateType>(
    (state) => state.categories
  );
  const { brands } = useSelector<RootState, BrandStateType>(
    (state) => state.brands
  );

  const dispatch = useDispatch<AppDispatch>();

  // Get Data From Context
  const { formMethods } = useProductCreation();
  const {
    register,
    formState: { errors },
    getValues,
    setValue,
  } = formMethods;


  const form = getValues();
  console.log("Errors in Validation", errors)

  const { images, colors, tags } = form;
  const imagesUrl = images.map((imageFile) => URL.createObjectURL(imageFile));

  console.log("Form Values", form);

  const handleChange = (key: string, value: any) => {
    setValue(key as any, value);
  };

  // Fetch Categories & Brands
  useEffect(() => {
    if (!categories.length) dispatch(fetchCategories());
    if (!brands.length) dispatch(fetchBrands());
  }, []);

  return (
    <>
      <CreateProductStepsComponent currentStep={0} />

      <div className="space-y-2">
        <Label>Name</Label>
        <Input
          {...register("name")}
          onChange={(evt) => handleChange("name", evt.target.value)}
          type="text"
          required
        />
        <ErrorMessage message={errors.name?.message} />
      </div>
      {/* ./name input */}

      <div className="space-y-2">
        <Label>Price</Label>
        <Input
          {...register("price")}
          onChange={(evt) => handleChange("price", +evt.target.value)}
          type="number"
          required
        />
        <ErrorMessage message={errors.price?.message} />
      </div>
      {/* ./price input */}

      <div className="space-y-2">
        <Label>Category</Label>
        <select
          {...register("category")}
          onChange={(evt) => handleChange("category", evt.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <ErrorMessage message={errors.category?.message} />
      </div>
      {/* ./category select */}

      <div className="space-y-2">
        <Label>Brand</Label>
        <select
          {...register("brand")}
          onChange={(evt) => handleChange("brand", evt.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        >
          <option value="">Select brand</option>
          {brands.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>
        <ErrorMessage message={errors.brand?.message} />
      </div>
      {/* ./brand select */}

      <div className="space-y-2">
        <Label>Images</Label>
        {form.images.map((file, idx) => (
          <div key={idx} className="flex items-center gap-2 mb-1">
            <Input
              onChange={(e) => {
                const newFile = e.target.files?.[0];
                if (!newFile) return;
                // Update files array
                const newImages = [...images];
                newImages[idx] = newFile;
                setValue("images", newImages);
              }}
              type="file"
              accept="image/*"
              className="w-full"
            />
            {imagesUrl[idx] && (
              <img
                src={imagesUrl[idx]}
                alt={`Preview ${idx + 1}`}
                className="w-16 h-16 object-cover rounded border"
              />
            )}

            {images.length > 1 && (
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={() => {
                  const newImages = images.filter((_, i) => i !== idx);
                  setValue("images", newImages);
                }}
              >
                <X size={16} />
              </Button>
            )}
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            const newImages = [...images, new File([], "")];
            setValue("images", newImages);
          }}
        >
          <Plus size={16} className="mr-1" /> Add Image
        </Button>

        <ErrorMessage message={errors.images?.message} />
      </div>
      {/* ./ images input */}

      <div className="space-y-2">
        <Label>Colors</Label>
        {colors.map((color, idx) => (
          <div key={idx} className="flex gap-2 items-center mb-1">
            <Input
              value={color.name}
              onChange={(e) => {
                // All Colors Array
                const newColors = [...colors];
                // Current Color Object
                newColors[idx] = { ...newColors[idx], name: e.target.value };

                setValue("colors", newColors);
              }}
              placeholder="Name"
              className="w-1/3"
            />
            <Input
              value={color.hexCode}
              onChange={(e) => {
                const newColors = [...colors];
                newColors[idx] = { ...newColors[idx], hexCode: e.target.value };

                setValue("colors", newColors);
              }}
              type="color"
              className="w-12 h-10 p-0"
            />
            <Input
              value={color.quantity}
              onChange={(e) => {
                const newColors = [...colors];
                newColors[idx] = { ...newColors[idx], quantity: +e.target.value };

                setValue("colors", newColors);
              }}
              placeholder="Quantity"
              type="number"
              className="w-1/4"
            />
            {colors.length > 1 && (
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={() => {
                  const newColors = colors.filter((_, i) => i !== idx);
                  setValue("colors", newColors);
                }}
              >
                <X size={16} />
              </Button>
            )}
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            const newColors = [...colors, { name: "", hexCode: "", quantity: 1 }];
            setValue("colors", newColors);
          }}
        >
          <Plus size={16} className="mr-1" /> Add Color
        </Button>

        <ErrorMessage message={errors.colors?.message} />
      </div>
      {/* ./colors input */}

      <div className="space-y-2">
        <Label>Quantity</Label>
        <Input
          {...register("quantity")}
          onChange={(evt) => handleChange("quantity", +evt.target.value)}
          type="number"
          required
        />

        <ErrorMessage message={errors.quantity?.message} />
      </div>
      {/* ./Quantity input */}

      <div className="space-y-2">
        <Label>Tags</Label>
        {tags.map((tag, idx) => (
          <div key={idx} className="flex items-center gap-2 mb-1">
            <Input
              value={tag}
              onChange={(e) => {
                const newTags = [...tags];
                newTags[idx] = e.target.value;
                setValue("tags", newTags);
              }}
              placeholder="Tag"
            />
            {tags.length > 1 && (
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={() => {
                  const newTags = tags.filter((_, i) => i !== idx);
                  setValue("tags", newTags);
                }}
              >
                <X size={16} />
              </Button>
            )}
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            const newTags = [...tags, ""];
            setValue("tags", newTags);
          }}
        >
          <Plus size={16} className="mr-1" /> Add Tag
        </Button>

        <ErrorMessage message={errors.tags?.message} />
      </div>
      {/* ./Tags input */}
    </>
  );
}