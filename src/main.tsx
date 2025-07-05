import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.tsx";

import store, { persistor } from "./app/redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";

import "./index.css";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Toaster position="top-center" richColors />
      <App />
    </PersistGate>
  </Provider>
);
