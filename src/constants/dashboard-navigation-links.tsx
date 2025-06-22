import {
  FiMonitor,
  FiShoppingCart,
  FiList,
  FiFileText,
  FiBook,
  FiSettings,
} from "react-icons/fi";

export const DashboardNavigationLinks = [
  {
    key: "/",
    icon: <FiMonitor />,
    label: "Dashboard",
  },
  {
    key: "catalog",
    icon: <FiShoppingCart />,
    label: "Catalog",
    children: [
      {
        key: "products",
        label: "Products",
        children: [
          {
            key: "all-products",
            label: "All Products",
          },
          {
            key: "add-product",
            label: "Add Product",
          },
        ],
      },
      {
        key: "categories",
        label: "Categories",
        children: [
          {
            key: "all-categories",
            label: "All Categories",
          },
          {
            key: "add-category",
            label: "Add Category",
          },
        ],
      },
      {
        key: "brands",
        label: "Brands",
        children: [
          {
            key: "all-brands",
            label: "All Brands",
          },
          {
            key: "add-brand",
            label: "Add Brand",
          },
        ],
      },
    ],
  },
  {
    key: "orders",
    icon: <FiList />,
    label: "Orders",
  },
  {
    key: "reports",
    icon: <FiFileText />,
    label: "Reports",
  },
  {
    key: "blogs",
    icon: <FiBook />,
    label: "Blogs",
    children: [
      {
        key: "/",
        label: "List blogs",
      },
      {
        key: "add-blog",
        label: "Create a blog",
      },
      {
        key: "add-blog-category",
        label: "Add Blog Category",
      },
    ],
  },
  {
    key: "settings",
    icon: <FiSettings />,
    label: "Settings",
  },
];
