export type Product = {
  mode: "get";
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  quantity: number; // Total quantity available
  category: string; // Category ID
  brand: string; // Brand ID
  tags: string[]; // Array of tag IDs
  images: string[]; // Array of image URLs
  colors?: { name: string; hexCode: string; quantity: number }[]; // Optional array of color IDs
};

export type ProductCreation = {
  mode: "create";
  name: string;
  description: string;
  price: number;
  quantity: number; // Total quantity available
  category: string; // Category ID
  brand: string; // Brand ID
  tags: string[]; // Array of tag IDs
  images: File[]; // Array of image URLs
  colors?: { name: string; hexCode: string; quantity: number }[]; // Optional array of color IDs
}