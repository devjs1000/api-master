import { TextWrap } from "@/components/custom";
import { Button, ButtonProps } from "@/components/ui/button";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { CollapsibleTrigger } from "@radix-ui/react-collapsible";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import {
  User2,
  ChevronUp,
  User2Icon,
  LogOutIcon,
  PlusIcon,
  FileIcon,
  FolderIcon,
} from "lucide-react";
import { useMemo } from "react";

function ProjectSidebar() {
  const bottom_actions = useMemo(() => create_bottom_actions(), []);
  const file_and_folders = useMemo(() => create_files_and_folders(), []);
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
          <FileAndFolders elements={file_and_folders} />
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> Username
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width] bg-white shadow-xl rounded-lg border border-zinc-200 px-1 "
              >
                {bottom_actions.map(
                  ({ action, name, Icon, variant }, index) => {
                    return (
                      <DropdownMenuItem key={index} className="w-full my-1">
                        <Button
                          variant={variant || "ghost"}
                          onClick={action}
                          className="w-full text-start justify-start px-4 rounded-lg"
                        >
                          {name}
                          {Icon && <Icon className="ml-auto" />}
                        </Button>
                      </DropdownMenuItem>
                    );
                  }
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
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

interface Actions {
  name: string;
  action: () => void;
  variant?: ButtonProps["variant"];
  Icon?: typeof LogOutIcon;
}

const create_files_and_folders = (): (ApiFolder | ApiFile)[] => {
  return [
    {
      id: "1",
      type: "folder",
      name: "Folder 1",
      children: [
        {
          id: "1",
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
              id: "1",
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
          id: "1",
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
  ];
};

const FileAndFolders = ({ elements }: FileAndFoldersProps) => {
  return elements.map((element) => {
    const is_folder = element.type === "folder";
    const Icon = is_folder ? FolderIcon : FileIcon;
    const has_children = is_folder && element.children.length;

    return (
      <Collapsible className="group/collapsible w-full">
        <SidebarMenuItem>
          <CollapsibleTrigger className=" w-full">
            <SidebarMenuButton>
              <Icon />
              <TextWrap type="p4">
                {element.name} {has_children && `(${element.children.length})`}
              </TextWrap>
            </SidebarMenuButton>
          </CollapsibleTrigger>
          {has_children && (
            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  {/* <SidebarMenuButton className="w-full">
                    <FileIcon />
                    <TextWrap type="p4">File 1</TextWrap>
                  </SidebarMenuButton> */}
                  <FileAndFolders elements={element.children} />
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          )}
        </SidebarMenuItem>
      </Collapsible>
    );
  });

  // const is_folder = element.type === "folder";
  // const Icon = is_folder ? FolderIcon : FileIcon;
  // const has_children = is_folder && element.children.length;

  // return (
  //   <SidebarMenuItem>
  //     <SidebarMenuButton>
  //       <Icon />
  //       <TextWrap type="p4">{element.name}</TextWrap>
  //     </SidebarMenuButton>
  //   </SidebarMenuItem>
  // );
};

type FileAndFoldersType = (ApiFolder | ApiFile)[];
interface FileAndFoldersProps {
  elements: FileAndFoldersType;
}
