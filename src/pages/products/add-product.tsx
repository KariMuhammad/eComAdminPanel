import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";
import { type Product } from "@/types/product";
import { CreateProductStepsComponent } from "@/constants/create-product-steps";

// Dummy data for categories and brands
const categories = [
  { _id: "1", name: "Electronics" },
  { _id: "2", name: "Clothing" },
];
const brands = [
  { _id: "1", name: "Apple" },
  { _id: "2", name: "Nike" },
];

export default function AddProduct() {
  const [form, setForm] = useState<Product>({
    name: "",
    description: "",
    price: 0,
    category: "",
    brand: "",
    images: [""],
    colors: [{ name: "", hexCode: "", quantity: 1 }],
    quantity: 0,
    sold: 0,
    tags: [""],
  });

  // Handlers for dynamic fields
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleArrayChange = (field: string, idx: number, value: string) => {
    const arr = [...(form as any)[field]];
    arr[idx] = value;
    setForm({ ...form, [field]: arr });
  };

  const handleColorChange = (idx: number, key: string, value: string) => {
    const arr = [...form.colors];
    arr[idx] = { ...arr[idx], [key]: value };
    setForm({ ...form, colors: arr });
  };

  const addField = (field: string, empty: any) => {
    setForm({ ...form, [field]: [...(form as any)[field], empty] });
  };

  const removeField = (field: string, idx: number) => {
    const arr = [...(form as any)[field]];
    arr.splice(idx, 1);
    setForm({ ...form, [field]: arr });
  };

  return (
    <form className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow space-y-6">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>

      <CreateProductStepsComponent currentStep={0} />

      <div className="space-y-2">
        <Label>Name</Label>
        <Input name="name" value={form.name} onChange={handleChange} required />
      </div>
      {/* ./name input */}

      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          required
        />
      </div>
      {/* ./description input */}

      <div className="space-y-2">
        <Label>Price</Label>
        <Input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          required
        />
      </div>
      {/* ./price input */}

      <div className="space-y-2">
        <Label>Category</Label>
        <select
          name="category"
          className="w-full border rounded px-3 py-2"
          value={form.category}
          onChange={handleChange}
          required
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      {/* ./category select */}

      <div className="space-y-2">
        <Label>Brand</Label>
        <select
          name="brand"
          className="w-full border rounded px-3 py-2"
          value={form.brand}
          onChange={handleChange}
          required
        >
          <option value="">Select brand</option>
          {brands.map((brand) => (
            <option key={brand._id} value={brand._id}>
              {brand.name}
            </option>
          ))}
        </select>
      </div>
      {/* ./brand select */}

      <div className="space-y-2">
        <Label>Images</Label>
        {form.images.map((img, idx) => (
          <div key={idx} className="flex items-center gap-2 mb-1">
            <Input
              placeholder="Image URL"
              value={img}
              onChange={(e) => handleArrayChange("images", idx, e.target.value)}
            />
            {form.images.length > 1 && (
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
          onClick={() => addField("images", "")}
        >
          <Plus size={16} className="mr-1" /> Add Image
        </Button>
      </div>
      {/* ./ images input */}

      <div className="space-y-2">
        <Label>Colors</Label>
        {form.colors?.map((color, idx) => (
          <div key={idx} className="flex gap-2 items-center mb-1">
            <Input
              placeholder="Name"
              value={color.name}
              onChange={(e) => handleColorChange(idx, "name", e.target.value)}
              className="w-1/3"
            />
            <Input
              type="color"
              value={color.hexCode}
              onChange={(e) =>
                handleColorChange(idx, "hexCode", e.target.value)
              }
              className="w-12 h-10 p-0"
            />
            <Input
              placeholder="Quantity"
              type="number"
              value={color.quantity}
              onChange={(e) =>
                handleColorChange(idx, "quantity", e.target.value)
              }
              className="w-1/4"
            />
            {form.colors.length > 1 && (
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
            addField("colors", { name: "", hexCode: "", quantity: "" })
          }
        >
          <Plus size={16} className="mr-1" /> Add Color
        </Button>
      </div>
      {/* ./colors input */}

      <div className="space-y-2">
        <Label>Quantity</Label>
        <Input
          name="quantity"
          type="number"
          value={form.quantity}
          onChange={handleChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label>Sold</Label>
        <Input
          name="sold"
          type="number"
          value={form.sold}
          onChange={handleChange}
        />
      </div>
      {/* ./Quantity input */}

      <div className="space-y-2">
        <Label>Tags</Label>
        {form.tags.map((tag, idx) => (
          <div key={idx} className="flex items-center gap-2 mb-1">
            <Input
              placeholder="Tag"
              value={tag}
              onChange={(e) => handleArrayChange("tags", idx, e.target.value)}
            />
            {form.tags.length > 1 && (
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
          onClick={() => addField("tags", "")}
        >
          <Plus size={16} className="mr-1" /> Add Tag
        </Button>
      </div>
      {/* ./Tags input */}

      <Button type="submit" className="w-full mt-4">
        Create Product
      </Button>
    </form>
  );
}
