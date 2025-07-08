import useProductCreation from "@/hooks/use-product-creation";

export default function AddProductShipping() {
  const { form } = useProductCreation();

  console.log(form);

  return <div>AddProductShipping</div>;
}
