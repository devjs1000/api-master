import { AppSidebar } from "@/components/core";
import { SidebarProvider } from "@/components/ui/sidebar";
import { use_process_store } from "./state";

const App = () => {
  const { sidebar } = use_process_store();
  return (
    <SidebarProvider open={sidebar.open}>
      <AppSidebar />
    </SidebarProvider>
  );
};

export default App;
