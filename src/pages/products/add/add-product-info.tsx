import { useEffect } from "react";

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
  const { formMethods, mode, markFieldAsChanged, isFieldChanged } = useProductCreation();
  const {
    register,
    formState: { errors },
    getValues,
    setValue,
  } = formMethods;

  const form = getValues();
  console.log("Errors in Validation", errors)

  const { images, colors, tags } = form;

  console.log("Form Values", form);

  const handleChange = (key: string, value: any) => {
    setValue(key as any, value);
    // Mark field as changed in edit mode
    if (mode === "edit") {
      markFieldAsChanged(key);
    }
  };

  // Function to handle image removal
  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setValue("images", newImages);
    if (mode === "edit") {
      markFieldAsChanged("images");
    }
  };

  // Function to handle new file upload
  const handleFileUpload = (index: number, file: File) => {
    const newImages = [...images];
    newImages[index] = file;
    setValue("images", newImages);
    if (mode === "edit") {
      markFieldAsChanged("images");
    }
  };

  // Function to add new image slot
  const handleAddImage = () => {
    const newImages = [...images, new File([], "")];
    setValue("images", newImages);
    if (mode === "edit") {
      markFieldAsChanged("images");
    }
  };

  // Function to check if error should be shown (only for changed fields in edit mode)
  const shouldShowError = (fieldName: string) => {
    if (mode === "create") return true;
    return isFieldChanged(fieldName);
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
        {shouldShowError("name") && <ErrorMessage message={errors.name?.message} />}
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
        {shouldShowError("price") && <ErrorMessage message={errors.price?.message} />}
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
        {shouldShowError("category") && <ErrorMessage message={errors.category?.message} />}
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
        {shouldShowError("brand") && <ErrorMessage message={errors.brand?.message} />}
      </div>
      {/* ./brand select */}

      <div className="space-y-2">
        <Label>Images</Label>

        {/* All Images (both existing converted to Files and new uploads) */}
        {images.map((file, idx) => (
          <div key={idx} className="flex items-center gap-2 mb-1">
            <Input
              onChange={(e) => {
                const newFile = e.target.files?.[0];
                if (!newFile) return;
                handleFileUpload(idx, newFile);
              }}
              type="file"
              accept="image/*"
              className="w-full"
            />
            {file && file.size > 0 && (
              <img
                src={URL.createObjectURL(file)}
                alt={`Preview ${idx + 1}`}
                className="w-16 h-16 object-cover rounded border"
              />
            )}
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={() => handleRemoveImage(idx)}
            >
              <X size={16} />
            </Button>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAddImage}
        >
          <Plus size={16} className="mr-1" /> Add Image
        </Button>

        {shouldShowError("images") && <ErrorMessage message={errors.images?.message} />}
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
                if (mode === "edit") {
                  markFieldAsChanged("colors");
                }
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
                if (mode === "edit") {
                  markFieldAsChanged("colors");
                }
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
                if (mode === "edit") {
                  markFieldAsChanged("colors");
                }
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
                  if (mode === "edit") {
                    markFieldAsChanged("colors");
                  }
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
            if (mode === "edit") {
              markFieldAsChanged("colors");
            }
          }}
        >
          <Plus size={16} className="mr-1" /> Add Color
        </Button>

        {shouldShowError("colors") && <ErrorMessage message={errors.colors?.message} />}
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

        {shouldShowError("quantity") && <ErrorMessage message={errors.quantity?.message} />}
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
                if (mode === "edit") {
                  markFieldAsChanged("tags");
                }
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
                  if (mode === "edit") {
                    markFieldAsChanged("tags");
                  }
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
            if (mode === "edit") {
              markFieldAsChanged("tags");
            }
          }}
        >
          <Plus size={16} className="mr-1" /> Add Tag
        </Button>

        {shouldShowError("tags") && <ErrorMessage message={errors.tags?.message} />}
      </div>
      {/* ./Tags input */}
    </>
  );
}