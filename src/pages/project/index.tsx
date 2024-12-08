import { Box, Container } from "@/components/custom";
import {} from "react";
import ProjectSidebar from "./sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { use_process_store } from "@/states";
import { Separator } from "@/components/ui/separator";
import { Outlet } from "react-router-dom";
import { ProjectNav } from "./nav";

const Project = (_props: IProjectProps) => {
  const { sidebar, toggle_sidebar } = use_process_store();
  return (
    <SidebarProvider open={sidebar.open}>
      <ProjectSidebar />
      <Container reset_ui className="w-full">
        <Box className="flex border-b items-center">
          <SidebarTrigger onClick={toggle_sidebar} />
          <Separator orientation="vertical" className="h-5 mx-4" />
          <ProjectNav />
        </Box>
        <Outlet />
      </Container>
    </SidebarProvider>
  );
};

export default Project;

interface IProjectProps {}
