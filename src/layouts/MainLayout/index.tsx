import Sidebar from "@/components/shared/sidebar";
import { Outlet } from "react-router-dom";

const MainLayout: React.FC = () => {
  return (
    <div className="flex h-screen">
      <Sidebar>
        <Outlet />
        <footer className="px-2 py-1 text-center bg-black text-white">
          &copy; reserved in kimo.dev
        </footer>
      </Sidebar>
    </div>
  );
};

export default MainLayout;
