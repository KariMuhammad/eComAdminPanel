export type Product = {
  id?: string;
  slug?: string;
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
