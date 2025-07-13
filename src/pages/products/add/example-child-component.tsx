import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useProductForm from "@/hooks/use-product-form";
import ErrorMessage from "@/components/shared/error-message";

export default function ExampleChildComponent() {
    // Access form methods from parent layout
    const { formMethods: { register, formState: { errors }, setValue, watch } } = useProductForm();

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Example Child Component</h3>

            <div className="space-y-2">
                <Label>Product Name</Label>
                <Input
                    {...register("name")}
                    placeholder="Enter product name"
                    type="text"
                />
                <ErrorMessage message={errors.name?.message} />
            </div>

            <div className="space-y-2">
                <Label>Product Price</Label>
                <Input
                    {...register("price")}
                    placeholder="Enter price"
                    type="number"
                />
                <ErrorMessage message={errors.price?.message} />
            </div>

            {/* You can also use other form methods */}
            <div className="text-sm text-gray-600">
                Current form values: {JSON.stringify(watch(), null, 2)}
            </div>
        </div>
    );
} 