import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { useDispatch } from "./../../../node_modules/react-redux/src/hooks/useDispatch";
import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./features/auth";
import { customerReducer } from "./features/customers";
import { persistStore, persistReducer } from "redux-persist";
import { productReducer } from "./features/products";

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
  },

  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export default store;
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>(); // Export a hook that can be reused to resolve types
