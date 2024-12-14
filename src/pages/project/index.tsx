import { Container } from "@/components/custom";
import ProjectSidebar from "./sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { use_process_store } from "@/states";
import { Outlet } from "react-router-dom";
import { ProjectNav } from "./nav";

const Project = (_props: IProjectProps) => {
  const { sidebar } = use_process_store();
  return (
    <SidebarProvider open={sidebar.project}>
      <ProjectSidebar />
      <Container reset_ui className="w-full">
        <ProjectNav />
        <Outlet />
      </Container>
    </SidebarProvider>
  );
};

export default Project;

interface IProjectProps {}
