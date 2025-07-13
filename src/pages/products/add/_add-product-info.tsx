import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";
import { CreateProductStepsComponent } from "@/constants/create-product-steps";
import { useDispatch, useSelector } from "react-redux";
import { useFieldArray } from "react-hook-form";
import ErrorMessage from "@/components/shared/error-message";
import useProductCreation from "@/hooks/use-product-creation";
import type { Product } from "@/types/product";
import type React from "react";
import type { ArrayKeys, ElementOf } from "@/types";
import { useEffect } from "react";
import {
  fetchCategories,
  type CategoryStateType,
} from "@/app/redux/features/categories";
import type { AppDispatch, RootState } from "@/app/redux/store";
import { fetchBrands, type BrandStateType } from "@/app/redux/features/brands";


export default function AddProductInfo() {
  const { categories } = useSelector<RootState, CategoryStateType>(
    (state) => state.categories
  );
  const { brands } = useSelector<RootState, BrandStateType>(
    (state) => state.brands
  );

  const dispatch = useDispatch<AppDispatch>();
  type FormDataType = Product;

  const { form, setForm, formMethods } = useProductCreation();
  const {
    control,
    register,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = formMethods;

  console.log("Form Values", getValues());

  const {
    fields: imagesFields,
    append: imagesAppend,
    remove: imagesRemove,
  } = useFieldArray({ name: "images", control });
  const {
    fields: tagsFields,
    append: tagsAppend,
    remove: tagsRemove,
  } = useFieldArray({ name: "tags", control });
  const {
    fields: colorsFields,
    append: colorsAppend,
    remove: colorsRemove,
  } = useFieldArray({ name: "colors", control });

  const handleChange = (key: string, value: any) => {
    setValue(key as any, value);
    setForm({ ...form, [key]: value });
  };

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
            <option key={brand.name} value={brand.name}>
              {brand.name}
            </option>
          ))}
        </select>
        <ErrorMessage message={errors.brand?.message} />
      </div>
      {/* ./brand select */}

      <div className="space-y-2">
        <Label>Images</Label>
        {imagesFields &&
          imagesFields.map((img, idx) => (
            <div key={idx} className="flex items-center gap-2 mb-1">
              <Input
                {...register(`images.${idx}.url`)}
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  // Optionally: upload to server or cloud here and get URL
                  // For demo, just use local URL
                  const url = URL.createObjectURL(file);
                  setValue(`images.${idx}.url`, url);
                }}
                type="file"
                accept="image/*"
                className="w-full"
              />
              {img && (
                <img
                  src={img.url}
                  alt={`Preview ${idx + 1}`}
                  className="w-16 h-16 object-cover rounded border"
                />
              )}
              {imagesFields && imagesFields.length > 1 && (
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={() => imagesRemove(idx)}
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
          onClick={() => imagesAppend({ url: "" })}
        >
          <Plus size={16} className="mr-1" /> Add Image
        </Button>

        <ErrorMessage message={errors.images?.message} />
      </div>
      {/* ./ images input */}

      <div className="space-y-2">
        <Label>Colors</Label>
        {colorsFields?.map((color, idx) => (
          <div key={idx} className="flex gap-2 items-center mb-1">
            <Input
              {...register(`colors.${idx}.name`)}
              placeholder="Name"
              className="w-1/3"
            />
            <Input
              {...register(`colors.${idx}.hexCode`)}
              type="color"
              className="w-12 h-10 p-0"
            />
            <Input
              {...register(`colors.${idx}.quantity`)}
              placeholder="Quantity"
              type="number"
              className="w-1/4"
            />
            {colorsFields && colorsFields.length > 1 && (
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={() => colorsRemove(idx)}
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
          onClick={() => colorsAppend({ name: "", hexCode: "", quantity: 1 })}
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
        {tagsFields &&
          tagsFields.map((tag, idx) => (
            <div key={idx} className="flex items-center gap-2 mb-1">
              <Input
                {...register(`tags.${idx}.text`)}
                placeholder="Tag"
              />
              {tagsFields && tagsFields.length > 1 && (
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={() => tagsRemove()}
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
          onClick={() => tagsAppend({ text: "" })}
        >
          <Plus size={16} className="mr-1" /> Add Tag
        </Button>

        <ErrorMessage message={errors.tags?.message} />
      </div>
      {/* ./Tags input */}
    </>
  );
}