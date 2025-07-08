import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthLayout, MainLayout } from "./layouts";

import Dasboard from "./pages/dashboard";
import {
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
} from "./pages/auth";

import "./App.css";
import ProductsListPage from "./pages/products/products-list";
import AddBlog from "./pages/blog/add-blog";
import UploadImageBlog from "./pages/blog/upload-image-blog";
import AddColor from "./pages/colors/add-color";
import AddCategory from "./pages/categories/add-category";
import AddBrand from "./pages/brands/add-brand";
import CustomersList from "./pages/customers/customers-list";
import CategoryList from "./pages/categories/category-list";
import BrandList from "./pages/brands/brand-list";
import BlogList from "./pages/blog/blog-list";
import OrdersList from "./pages/orders/orders-list";
import AddProductLayout from "./pages/products/add/AddProductLayout";
import AddProductInfo from "./pages/products/add/add-product-info";
import AddPoductDescription from "./pages/products/add/add-product-description";
import AddProductShipping from "./pages/products/add/add-product-shipping";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dasboard />} />

          {/* ---------------- Products Routes ----------------  */}
          <Route path="/products">
            <Route index element={<ProductsListPage />} />
            <Route path="add" element={<AddProductLayout />}>
              <Route path="basic-info" element={<AddProductInfo />} />
              <Route
                path="full-description"
                element={<AddPoductDescription />}
              />
              <Route path="shipping" element={<AddProductShipping />} />
            </Route>
          </Route>
          {/* ---------------- ./Products Routes ----------------  */}

          {/* <Route path="/gallery/add-image" element={<ِAddImageInGalleryUser />} */}

          <Route path="/categories" element={<CategoryList />} />
          <Route path="/categories/add" element={<AddCategory />} />
          <Route path="/brands" element={<BrandList />} />
          <Route path="/brands/add" element={<AddBrand />} />
          {/* <Route path="/colors" element={} /> */}
          <Route path="/colors/add" element={<AddColor />} />
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/add-blog" element={<AddBlog />} />
          <Route path="/add-blog/upload-image" element={<UploadImageBlog />} />
          {/* <Route path="/blogs-categories" element={} /> */}
          <Route path="/orders" element={<OrdersList />} />
          <Route path="/customers" element={<CustomersList />} />
        </Route>

        <Route path="/auth" element={<AuthLayout />}>
          <Route path="/auth/sign-in" element={<LoginPage />} />
          <Route path="/auth/sign-up" element={<RegisterPage />} />
          <Route
            path="/auth/forgot-password"
            element={<ForgotPasswordPage />}
          />
          <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
        </Route>

        <Route path="/settings" element={<div>Settings Page</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
