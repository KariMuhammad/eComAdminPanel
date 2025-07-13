export const API_BASE_URL = "http://localhost:3000";

export const ADD_PRODUCT_INITIAL_STATE = {
  brand: "",
  category: "",
  description: "",
  name: "",
  price: 0,
  quantity: 1,
  tags: [],
  images: [],
  colors: [{ hexCode: "", name: "", quantity: 1 }],
};

export const createProductSteps = [
  {
    id: 0,
    url: "/products/add/basic-info",
    title: "Product Details",
    description: "Enter the basic information about your product.",
  },
  {
    id: 1,
    url: "/products/add/full-description",
    title: "Product Description",
    description:
      "Provide a detailed description of your product, including features and benefits.",
  },
];
