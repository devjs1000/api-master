import { TextWrap } from "@/components/custom";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { User2Icon, LogOutIcon, PlusIcon } from "lucide-react";
import { useMemo } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Actions, ProjectSidebarFooter } from "./footer";
import { FileAndFolderContext } from "./file-and-folder-context";
import { use_project_store } from "@/states/project.state";
import { use_menu } from "@/hooks/use-menu";

function ProjectSidebar() {
  const bottom_actions = useMemo(() => create_bottom_actions(), []);
  const { current_project } = use_project_store();
  const file_and_folders = current_project?.children || [];
  const { open_create_form } = use_menu({});
  return (
    <Sidebar variant="sidebar">
      <SidebarHeader>
        <TextWrap type="h4" className="pl-2">
          API Master
        </TextWrap>
      </SidebarHeader>
      <SidebarSeparator className="m-0" />
      <SidebarContent className="gap-0">
        <SidebarMenu className="border-b">
          <SidebarMenuItem className="flex items-center">
            <SidebarMenuButton
              onClick={() => {
                open_create_form("folder", "");
              }}
            >
              <PlusIcon /> <TextWrap type="p4">Folder</TextWrap>
            </SidebarMenuButton>
            <SidebarMenuButton
              onClick={() => {
                open_create_form("file", "");
              }}
            >
              <PlusIcon /> <TextWrap type="p4">Api</TextWrap>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          <DndProvider backend={HTML5Backend}>
            <FileAndFolderContext elements={file_and_folders} />
          </DndProvider>
        </SidebarMenu>
      </SidebarContent>
      <ProjectSidebarFooter bottom_actions={bottom_actions} />
    </Sidebar>
  );
}

export default ProjectSidebar;

const create_bottom_actions = (): Actions[] => {
  return [
    {
      name: "Account",
      action: () => {
        console.log("Account");
      },
      Icon: User2Icon,
    },
    {
      name: "Sign Out",
      action: () => {
        console.log("Sign Out");
      },
      variant: "destructive",
      Icon: LogOutIcon,
    },
  ];
};
