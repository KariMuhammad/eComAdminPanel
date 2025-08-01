export type Product = {
  mode: "get";
  id: string;
  _id?: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  quantity: number; // Total quantity available
  category: string; // Category ID
  brand: string; // Brand ID
  tags: string[]; // Array of tag IDs
  images: {url: string, public_id: string}[]; // Array of image URLs
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