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

            {/* <Route path="/gallery/add-image" element={<ِAddImageInGalleryUser />} */}

            {/* ---------------- Categories Routes ---------------- */}
            <Route path="/categories" element={<CategoryList />} />
            <Route path="/categories/add" element={<AddCategory />} />
            <Route path="/categories/edit/:id" element={<AddCategory mode="edit" />} />
            {/* ---------------- ./Categories Routes ---------------- */}

            {/* ---------------- Brands Routes ---------------- */}
            <Route path="/brands" element={<BrandList />} />
            <Route path="/brands/add" element={<AddBrand />} />
            {/* ---------------- ./Brands Routes ---------------- */}

            {/* ---------------- Coupons Routes ---------------- */}
            <Route path="/coupons" element={<CouponList />} />
            <Route path="/coupons/add" element={<AddCoupon />} />
            {/* ---------------- ./Coupons Routes ---------------- */}

            {/* ---------------- Colors Routes ---------------- */}
            {/* ---------------- ./Colors Routes ---------------- */}

            {/* ---------------- Blogs Routes ---------------- */}
            {/* ---------------- - Blog Category ---------------- */}
            <Route path="/blog-category" element={<BlogCategoryList />} />
            <Route path="/blog-category/add" element={<AddBlogCategory />} />
            {/* ---------------- - ./Blog Category ---------------- */}
            <Route path="/blogs" element={<BlogList />} />
            <Route path="/add-blog" element={<AddBlog />} />
            <Route path="/add-blog/upload-image" element={<UploadImageBlog />} />
            {/* ---------------- ./Blogs Routes ---------------- */}


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
