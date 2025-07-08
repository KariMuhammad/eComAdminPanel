export type Product = {
  name: string;
  description: string;
  price: number;
  quantity: number; // Total quantity available
  category: string; // Category ID
  brand: string; // Brand ID
  tags: { text: string }[]; // Array of tag IDs
  images: { url: string }[]; // Array of image URLs
  colors?: { name: string; hexCode: string; quantity: number }[]; // Optional array of color IDs
};
