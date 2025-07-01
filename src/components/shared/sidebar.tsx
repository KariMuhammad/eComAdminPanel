import { AppSidebar } from "../dashboard/app-sidebar";
import { SidebarProvider } from "../ui/sidebar";

export default function Sidebar({ children }: React.PropsWithChildren) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />

      <div className="flex-1 overflow-y-auto">{children}</div>
    </SidebarProvider>
  );
}
