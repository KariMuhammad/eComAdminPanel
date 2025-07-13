import Sidebar from "@/components/shared/sidebar";
import AuthProvider from "@/providers/AuthProvider";

import { Outlet } from "react-router-dom";

const MainLayout: React.FC = () => {
  return (
    <AuthProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <Outlet />
          <footer className="px-2 py-1 text-center bg-black text-white">
            &copy; reserved in kimo.dev
          </footer>
        </Sidebar>
      </div>
    </AuthProvider>
  );
};

export default MainLayout;
