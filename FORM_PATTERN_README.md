# Using useForm in Parent Layout with Outlet Children

This pattern allows you to manage a single form state in a parent layout component and access all form methods in child components rendered through React Router's `Outlet`.

## Architecture Overview

```
AddProductLayout (Parent)
├── useForm() - Form state management
├── <form> - Form wrapper
├── <Outlet /> - Child components
└── Submit button
```

## Key Components

### 1. Context Provider (`ProductCreationProvider.tsx`)

The provider initializes `useForm` and makes it available to all child components:

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addProductSchema } from "@/schemas/add-product";

export default function ProductCreationProvider({ children }) {
  const formMethods = useForm({
    resolver: zodResolver(addProductSchema),
    defaultValues: ADD_PRODUCT_INITIAL_STATE,
  });

  return (
    <ProductCreationContext.Provider value={{ 
      form, 
      setForm, 
      resetForm, 
      formMethods 
    }}>
      {children}
    </ProductCreationContext.Provider>
  );
}
```

### 2. Context Type (`product-creation-context.ts`)

Define the context type to include form methods:

```tsx
type ProductCreationContextType = {
  form: Product;
  setForm: React.Dispatch<React.SetStateAction<Product>>;
  resetForm: () => void;
  formMethods: UseFormReturn<z.infer<typeof addProductSchema>>;
};
```

### 3. Parent Layout (`AddProductLayout.tsx`)

The layout component handles form submission and renders the form wrapper:

```tsx
function AddProductForm() {
  const { formMethods } = useContext(ProductCreationContext);
  const { handleSubmit } = formMethods;

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Add New Product</h2>
      <Outlet /> {/* Child components go here */}
      <Button type="submit">Create Product</Button>
    </form>
  );
}
```

### 4. Child Components

Child components can access all form methods through context:

```tsx
// Using the main hook
import useProductCreation from "@/hooks/use-product-creation";

export default function AddProductInfo() {
  const { formMethods } = useProductCreation();
  const { register, formState: { errors }, setValue } = formMethods;

  return (
    <div>
      <Input {...register("name")} />
      <ErrorMessage message={errors.name?.message} />
    </div>
  );
}
```

```tsx
// Using the dedicated form hook
import useProductForm from "@/hooks/use-product-form";

export default function ExampleChildComponent() {
  const { register, formState: { errors }, watch } = useProductForm();

  return (
    <div>
      <Input {...register("price")} />
      <div>Current values: {JSON.stringify(watch())}</div>
    </div>
  );
}
```

## Available Hooks

### `useProductCreation()`
Returns the complete context including form state and methods:
```tsx
const { form, setForm, resetForm, formMethods } = useProductCreation();
```

### `useProductForm()`
Returns only the form methods for cleaner access:
```tsx
const { register, handleSubmit, formState, setValue, watch } = useProductForm();
```

## Benefits

1. **Single Form State**: All form data is managed in one place
2. **Shared Validation**: Form validation works across all child components
3. **Centralized Submission**: Form submission is handled in the parent
4. **Type Safety**: Full TypeScript support with proper typing
5. **Reusable**: Child components can be easily reused in different forms

## Usage Examples

### Basic Input Field
```tsx
const { register, formState: { errors } } = useProductForm();

<Input {...register("name")} />
<ErrorMessage message={errors.name?.message} />
```

### Dynamic Fields with useFieldArray
```tsx
const { control } = useProductForm();
const { fields, append, remove } = useFieldArray({ 
  name: "tags", 
  control 
});

{fields.map((field, index) => (
  <Input {...register(`tags.${index}.text`)} />
))}
```

### Setting Values Programmatically
```tsx
const { setValue } = useProductForm();

const handleFileUpload = (file) => {
  const url = URL.createObjectURL(file);
  setValue("images.0.url", url);
};
```

### Watching Form Values
```tsx
const { watch } = useProductForm();
const formValues = watch();

// Watch specific fields
const name = watch("name");
```

## Best Practices

1. **Always wrap child components** with the `ProductCreationProvider`
2. **Use the dedicated hooks** for cleaner code
3. **Handle form submission** only in the parent layout
4. **Validate form state** before allowing navigation between steps
5. **Reset form** when needed using the `resetForm` function

## Error Handling

The hooks include proper error handling:

```tsx
const { formMethods } = useProductCreation();

if (!formMethods) {
  throw new Error("useProductCreation must be used within ProductCreationProvider");
}
```

This pattern provides a clean, type-safe way to manage complex forms across multiple components while maintaining a single source of truth for form state. 