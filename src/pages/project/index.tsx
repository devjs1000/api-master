import { Box, Container } from "@/components/custom";
import { use_project_store } from "@/state/project.state";
import {} from "react";
import ProjectNav from "./nav";
import ProjectSidebar from "./sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { use_process_store } from "@/state";
import { Separator } from "@/components/ui/separator";

const Project = (_props: IProjectProps) => {
  const {current_project} = use_project_store();
  const { sidebar, toggle_sidebar } = use_process_store();
  console.log(current_project?.children);
  return (
    <SidebarProvider open={sidebar.open}>
      <ProjectSidebar />
      <Container reset_ui className="w-full">
        <Box className="flex border-b items-center">
          <SidebarTrigger onClick={toggle_sidebar} />
          <Separator orientation="vertical" className="h-5 mx-4" />
          <ProjectNav />
        </Box>
      </Container>
    </SidebarProvider>
  );
};

export default Project;

interface IProjectProps {}
