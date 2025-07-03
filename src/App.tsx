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
import AddProduct from "./pages/products/add-product";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dasboard />} />
          <Route path="/products" element={<ProductsListPage />} />
          {/* <Route path="/gallery/add-image" element={<ِAddImageInGalleryUser />} */}

          <Route path="/products/add" element={<AddProduct />} />
          {/* <Route path="/categories" element={} /> */}
          <Route path="/categories/add" element={<AddCategory />} />
          {/* <Route path="/brands" element={} /> */}
          <Route path="/brands/add" element={<AddBrand />} />
          {/* <Route path="/colors" element={} /> */}
          <Route path="/colors/add" element={<AddColor />} />
          {/* <Route path="/blogs" element={} /> */}
          <Route path="/add-blog" element={<AddBlog />} />
          <Route path="/add-blog/upload-image" element={<UploadImageBlog />} />
          {/* <Route path="/blogs-categories" element={} /> */}
          {/* <Route path="/orders" element={} /> */}
          {/* <Route path="/customers" element={} /> */}
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
