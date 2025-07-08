import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";
import { CreateProductStepsComponent } from "@/constants/create-product-steps";
// import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addProductSchema } from "@/schemas/add-product";
import ErrorMessage from "@/components/shared/error-message";
import useProductCreation from "@/hooks/use-product-creation";
import type { z } from "zod";
import type { Product } from "@/types/product";
import type React from "react";

// Dummy data for categories and brands
const categories = [
  { _id: "1", name: "Electronics" },
  { _id: "2", name: "Clothing" },
];
const brands = [
  { _id: "1", name: "Apple" },
  { _id: "2", name: "Nike" },
];

export default function AddProductInfo() {
  // const dispatch = useDispatch();
  type FormDataType = Product;

  const { form, setForm } = useProductCreation() as {
    form: FormDataType;
    setForm: React.Dispatch<React.SetStateAction<Product>>;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: zodResolver(addProductSchema),
  });

  console.log("Form Values", getValues());

  const onSubmit = (formValues: z.infer<typeof addProductSchema>) => {
    alert(formValues);
  };

  const handleChange = <K extends keyof FormDataType>(
    evt: React.ChangeEvent,
    key: K,
    value: FormDataType[K]
  ) => {
    register(key).onChange({ ...evt, target: { ...evt.target, value } });
    setForm({ ...form, [key]: value });
  };

  // Handlers for dynamic fields
  const handleArrayChange = <K extends keyof FormDataType>(
    field: K,
    idx: number,
    value: string
    // value: FormDataType[K]
  ) => {
    // get all array values of this field (which its type array of strings)
    const arrayValue = form[field] as any;
    const arr = [...arrayValue];
    // which value you want to change (index needed)
    arr[idx] = value;
    // keep other fields of form as it is, and change field with new array
    setForm({ ...form, [field]: arr });
  };

  const handleColorChange = <
    K extends keyof NonNullable<FormDataType["colors"]>[number]
  >(
    key: K,
    idx: number,
    value: NonNullable<FormDataType["colors"]>[number][K]
  ) => {
    const arr = [...(form.colors ?? [])];
    arr[idx] = { ...arr[idx], [key]: value };
    setForm({ ...form, colors: arr });
  };

  /**
   * increase new field for new value
   * used only in fields that may contains multiple values (array) so that we form[field] as Array always
   * @param field
   * @param empty
   */
  const addField = <K extends keyof FormDataType>(
    field: K,
    empty: Array<FormDataType[K]>[number]
  ) => {
    setForm({
      ...form,
      [field]: [...(form[field] as Array<FormDataType[K]>), empty],
    });
  };

  /**
   * decrease a field
   * @param field
   * @param idx
   */
  const removeField = <K extends keyof FormDataType>(field: K, idx: number) => {
    const arr = [...(form[field] as Array<unknown>)];
    arr.splice(idx, 1);
    setForm({ ...form, [field]: arr });
  };

  return (
    <form
      className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow space-y-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>

      <CreateProductStepsComponent currentStep={0} />

      <div className="space-y-2">
        <Label>Name</Label>
        <Input
          {...register("name")}
          onChange={(evt) => handleChange(evt, "name", evt.target.value)}
          type="text"
          required
        />
        <ErrorMessage message={errors.name?.message} />
      </div>
      {/* ./name input */}

      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea
          {...register("description")}
          onChange={(evt) => {
            console.log(evt.target.value);
            handleChange(evt, "description", evt.target.value);
          }}
          required
        />
        <ErrorMessage message={errors.description?.message} />
      </div>
      {/* ./description input */}

      <div className="space-y-2">
        <Label>Price</Label>
        <Input
          {...register("price")}
          onChange={(evt) => handleChange(evt, "price", +evt.target.value)}
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
          onChange={(evt) => handleChange(evt, "category", evt.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
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
          onChange={(evt) => handleChange(evt, "brand", evt.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        >
          <option value="">Select brand</option>
          {brands.map((brand) => (
            <option key={brand._id} value={brand._id}>
              {brand.name}
            </option>
          ))}
        </select>
        <ErrorMessage message={errors.brand?.message} />
      </div>
      {/* ./brand select */}

      <div className="space-y-2">
        <Label>Images</Label>
        {form.images &&
          form.images.map((img, idx) => (
            <div key={idx} className="flex items-center gap-2 mb-1">
              <Input
                {...register("images")}
                type="file"
                accept="image/*"
                className="w-full"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  // Optionally: upload to server or cloud here and get URL
                  // For demo, just use local URL
                  const url = URL.createObjectURL(file);
                  register("images").onChange(e);
                  handleArrayChange("images", idx, url);
                }}
              />
              {img && (
                <img
                  src={img}
                  alt={`Preview ${idx + 1}`}
                  className="w-16 h-16 object-cover rounded border"
                />
              )}
              {form.images && form.images.length > 1 && (
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={() => removeField("images", idx)}
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
          onClick={() => addField("images", form.images)}
        >
          <Plus size={16} className="mr-1" /> Add Image
        </Button>

        <ErrorMessage message={errors.images?.message} />
      </div>
      {/* ./ images input */}

      <div className="space-y-2">
        <Label>Colors</Label>
        {form.colors?.map((color, idx) => (
          <div key={idx} className="flex gap-2 items-center mb-1">
            <Input
              {...register("colors")}
              placeholder="Name"
              value={color.name}
              onChange={(e) => {
                handleColorChange("name", idx, e.target.value);
                register("colors").onChange(e);
              }}
              className="w-1/3"
            />
            <Input
              {...register("colors")}
              type="color"
              value={color.hexCode}
              onChange={(e) => {
                handleColorChange("hexCode", idx, e.target.value);
                register("colors").onChange(e);
              }}
              className="w-12 h-10 p-0"
            />
            <Input
              placeholder="Quantity"
              type="number"
              value={color.quantity}
              onChange={(e) => {
                handleColorChange("quantity", idx, +e.target.value);
                register("colors").onChange(e);
              }}
              className="w-1/4"
            />
            {form.colors && form.colors.length > 1 && (
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={() => removeField("colors", idx)}
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
          onClick={() =>
            addField("colors", [{ name: "", hexCode: "", quantity: 1 }])
          }
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
          onChange={(evt) => handleChange(evt, "quantity", +evt.target.value)}
          type="number"
          required
        />

        <ErrorMessage message={errors.quantity?.message} />
      </div>
      {/* ./Quantity input */}

      <div className="space-y-2">
        <Label>Tags</Label>
        {form.tags &&
          form.tags.map((tag, idx) => (
            <div key={idx} className="flex items-center gap-2 mb-1">
              <Input
                placeholder="Tag"
                value={tag}
                onChange={(e) => handleArrayChange("tags", idx, e.target.value)}
              />
              {form.tags && form.tags.length > 1 && (
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={() => removeField("tags", idx)}
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
          onClick={() => addField("tags", [""])}
        >
          <Plus size={16} className="mr-1" /> Add Tag
        </Button>

        <ErrorMessage message={errors.tags?.message} />
      </div>
      {/* ./Tags input */}

      <Button type="submit" className="w-full mt-4">
        Create Product
      </Button>
    </form>
  );
}
