import { SidebarProvider } from "@/components/ui/sidebar";
import { use_process_store } from "@/state";
import { AppSidebar } from "@/pages/layout/app-sidebar";
import { Outlet } from "react-router-dom";

export const LayoutPage = (_props: ILayoutPageProps) => {
  const { sidebar } = use_process_store();
  return (
    <SidebarProvider open={sidebar.open}>
      <AppSidebar />
      <Outlet />
    </SidebarProvider>
  );
};

interface ILayoutPageProps {}
