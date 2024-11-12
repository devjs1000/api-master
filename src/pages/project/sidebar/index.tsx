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
import { useMemo, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FileAndFoldersType } from "./file-and-folder";
import { Actions, ProjectSidebarFooter } from "./footer";
import { FileAndFolderContext } from "./file-and-folder-context";

function ProjectSidebar() {
  const bottom_actions = useMemo(() => create_bottom_actions(), []);
  const [file_and_folders] = useState(create_files_and_folders);
  return (
    <Sidebar variant="sidebar">
      <SidebarHeader>
        <TextWrap type="h4" className="pl-2">
          API Master
        </TextWrap>
      </SidebarHeader>
      <SidebarSeparator className="m-0" />
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center pt-2">
            <SidebarMenuButton>
              <PlusIcon /> <TextWrap type="p4">Folder</TextWrap>
            </SidebarMenuButton>
            <SidebarMenuButton>
              <PlusIcon /> <TextWrap type="p4">Api</TextWrap>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarSeparator className="m-0" />
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

const create_files_and_folders = (): FileAndFoldersType[] => {
  return [
    {
      id: "1",
      type: "folder",
      name: "Folder 1",
      children: [
        {
          id: "1.1",
          type: "file",
          name: "File 1",
          params: {},
          responses: [],
          version: "1.0.0",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          //folder
          id: "2",
          type: "folder",
          name: "Folder 2",
          children: [
            {
              id: "1.1.1",
              type: "file",
              name: "File 2",
              params: {},
              responses: [],
              version: "1.0.0",
              created_at: new Date(),
              updated_at: new Date(),
            },
          ],
          version: "1.0.0",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      version: "1.0.0",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: "2",
      type: "file",
      name: "File 2",
      params: {},
      responses: [],
      version: "1.0.0",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: "3",
      type: "folder",
      name: "Folder 2",
      children: [
        {
          id: "1.2",
          type: "file",
          name: "File 3",
          params: {},
          responses: [],
          version: "1.0.0",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      version: "1.0.0",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: "4",
      type: "file",
      name: "File 4",
      params: {},
      responses: [],
      version: "1.0.0",
      created_at: new Date(),
      updated_at: new Date
    },
    {
      id: "5",
      type: "folder",
      name: "Folder 5",
      children: [
        {
          id: "1.3",
          type: "file",
          name: "File 5",
          params: {},
          responses: [],
          version: "1.0.0",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      version: "1.0.0",
      created_at: new Date(),
      updated_at: new Date(),
    },
  {
    id: "6",
    type: "file",
    name: "File 6",
    params: {},
    responses: [],
    version: "1.0.0",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: "7",
    type: "folder",
    name: "Folder 7",
    children: [
      {
        id: "1.4",
        type: "file",
        name: "File 7",
        params: {},
        responses: [],
        version: "1.0.0",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ],
    version: "1.0.0",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: "8",
    type: "file",
    name: "File 8",
    params: {},
    responses: [],
    version: "1.0.0",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: "9",
    type: "folder",
    name: "Folder 9",
    children: [
      {
        id: "1.5",
        type: "file",
        name: "File 9",
        params: {},
        responses: [],
        version: "1.0.0",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ],
    version: "1.0.0",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: "10",
    type: "file",
    name: "File 10",
    params: {},
    responses: [],
    version: "1.0.0",
    created_at: new Date(),
    updated_at: new Date(),
  }
];
}
