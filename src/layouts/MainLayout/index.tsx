import Sidebar from "@/components/shared/Sidebar";
import { Outlet } from "react-router-dom";

const LayoutContent: React.FC = () => {
  return (
    <div className="min-h-screen xl:flex">
      <aside className="basis-1/6 overflow-hidden">
        <Sidebar />
      </aside>

      <div className="">
        <main className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const MainLayout: React.FC = () => {
  return <LayoutContent />;
};

export default MainLayout;
