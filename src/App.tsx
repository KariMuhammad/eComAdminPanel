import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const MainLayout = lazy(() => import("./layouts/MainLayout"));
const AuthLayout = lazy(() => import("./layouts/AuthLayout"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const ProductsListPage = lazy(() => import("./pages/products/products-list"));
const AddBlog = lazy(() => import("./pages/blog/add-blog"));
const UploadImageBlog = lazy(() => import("./pages/blog/upload-image-blog"));
const AddCategory = lazy(() => import("./pages/categories/add-category"));
const AddBrand = lazy(() => import("./pages/brands/add-brand"));
const CustomersList = lazy(() => import("./pages/customers/customers-list"));
const CategoryList = lazy(() => import("./pages/categories/category-list"));
const BrandList = lazy(() => import("./pages/brands/brand-list"));
const BlogList = lazy(() => import("./pages/blog/blog-list"));
const OrdersList = lazy(() => import("./pages/orders/orders-list"));
const MutationProductLayout = lazy(() => import("./pages/products/add/add-product-layout"));
const AddProductInfo = lazy(() => import("./pages/products/add/add-product-info"));
const AddPoductDescription = lazy(() => import("./pages/products/add/add-product-description"));
const LoginPage = lazy(() => import("./pages/auth/sign-in"));
const RegisterPage = lazy(() => import("./pages/auth/sign-up"));
const ForgotPasswordPage = lazy(() => import("./pages/auth/forgot-password"));
const ResetPasswordPage = lazy(() => import("./pages/auth/reset-password"));
import PageLoader from "./shared/PageLoader";

import AddBlogCategory from "./pages/categories/add-blog-category";
import BlogCategoryList from "./pages/categories/blog-category-list";
import CouponList from "./pages/coupons/coupon-list";
import AddCoupon from "./pages/coupons/add-coupon";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />

            {/* ---------------- Products Routes ----------------  */}
            <Route path="/products">
              {/* List of Products */}
              <Route index element={<ProductsListPage />} />

              {/* Create Product */}
              <Route path="add" element={<MutationProductLayout mode="create" />}>
                <Route path="basic-info" element={<AddProductInfo />} />
                <Route
                  path="full-description"
                  element={<AddPoductDescription />}
                />
                {/* <Route path="shipping" element={<AddProductShipping />} /> */}
              </Route>

              {/* Edit Product */}
              <Route path="edit/:slug" element={<MutationProductLayout mode="edit" />}>
                <Route path="basic-info" element={<AddProductInfo />} />
                <Route
                  path="full-description"
                  element={<AddPoductDescription />}
                />
                {/* <Route path="shipping" element={<AddProductShipping />} /> */}
              </Route>
            </Route>
            {/* ---------------- ./Products Routes ----------------  */}

            {/* ---------------- Categories Routes ---------------- */}
            <Route path="/categories">
              <Route index element={<CategoryList />} />
              <Route path="add" element={<AddCategory />} />
              <Route path="edit/:id" element={<AddCategory mode="edit" />} />
            </Route>
            {/* ---------------- ./Categories Routes ---------------- */}

            {/* ---------------- Brands Routes ---------------- */}
            <Route path="/brands">
              <Route index element={<BrandList />} />
              <Route path="add" element={<AddBrand />} />
              <Route path="edit/:id" element={<AddBrand mode="edit" />} />
            </Route>
            {/* ---------------- ./Brands Routes ---------------- */}

            {/* ---------------- Coupons Routes ---------------- */}
            <Route path="/coupons" >
              <Route index element={<CouponList />} />
              <Route path="add" element={<AddCoupon />} />
              <Route path="edit/:id" element={<AddCoupon mode="edit" />} />
            </Route>
            {/* ---------------- ./Coupons Routes ---------------- */}

            {/* ---------------- /Blog Categories Routes ---------------- */}
            <Route path="/blog-category" >
              <Route index element={<BlogCategoryList />} />
              <Route path="add" element={<AddBlogCategory />} />
              <Route path="edit/:id" element={<AddBlogCategory mode="edit" />} />
            </Route>
            {/* ---------------- - ./Blog Category Routes ---------------- */}

            {/* ---------------- ./Blogs Routes ---------------- */}
            <Route path="/blogs" >
              <Route index element={<BlogList />} />
              <Route path="add" element={<AddBlog />} />
              <Route path="add/upload-image" element={<UploadImageBlog />} />
              <Route path="edit/:id" element={<AddBlog mode="edit" />} />
            </Route>
            {/* ---------------- ./Blogs Routes ---------------- */}

            {/* <Route path="/gallery/add-image" element={<ِAddImageInGalleryUser />} */}

            <Route path="/orders" element={<OrdersList />} />
            <Route path="/customers" element={<CustomersList />} />
          </Route>

          {/* ---------------- ./Auth Routes ---------------- */}
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="/auth/sign-in" element={<LoginPage />} />
            <Route path="/auth/sign-up" element={<RegisterPage />} />
            <Route
              path="/auth/forgot-password"
              element={<ForgotPasswordPage />}
            />
            <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
          </Route>
          {/* ---------------- ./Auth Routes ---------------- */}

          <Route path="/settings" element={<div>Settings Page</div>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
