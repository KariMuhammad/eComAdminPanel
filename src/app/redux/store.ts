import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query'

import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { useDispatch } from "./../../../node_modules/react-redux/src/hooks/useDispatch";
import { authReducer } from "./features/auth";
import { customerReducer } from "./features/customers";
import { persistStore, persistReducer } from "redux-persist";
import { productReducer } from "./features/products";
import { categoriesApi } from "./features/categories";
import { brandReducer } from "./features/brands";
import { orderReducer } from "./features/orders";
import { blogCategoryReducer } from "./features/blog-categories";
import { couponReducer } from "./features/coupons";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedReducer, // Use the persisted reducer for auth state
    customers: customerReducer, // Regular reducer for customers state
    products: productReducer, // Regular reducer for products state
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    brands: brandReducer,
    orders: orderReducer,
    blogCategories: blogCategoryReducer,
    coupons: couponReducer
  },

  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(categoriesApi.middleware),
});

export default store;
setupListeners(store.dispatch);
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>(); // Export a hook that can be reused to resolve types
