import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* <Route index element={<Dashboard />} /> */}
        </Route>

        <Route path="/auth" element={<AuthLayout />}>
          {/* <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="reset-password" element={<ResetPasswordPage />} /> */}
        </Route>

        <Route path="/settings" element={<div>Settings Page</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
