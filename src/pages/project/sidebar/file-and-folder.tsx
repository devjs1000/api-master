import { TextWrap } from "@/components/custom";
import { CustomDropdown } from "@/components/custom-shad";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { use_menu } from "@/hooks/use-menu";
import { cn } from "@/lib/utils";
import { use_project_store } from "@/states/project.state";
import { CollapsibleTrigger } from "@radix-ui/react-collapsible";
import {
  Edit3Icon,
  FileIcon,
  FolderIcon,
  MoreVerticalIcon,
  TrashIcon,
} from "lucide-react";
import { useDrag, useDrop } from "react-dnd";
import { useNavigate } from "react-router-dom";

export const FileAndFolder = ({
  element,
  sibling_index,
}: FileAndFoldersProps) => {
  const {
    selected_element,
    select_element,
    current_project_id,
    // move_element_by_id,
    remove_element_by_id,
  } = use_project_store();
  const is_folder = element.type === "folder";
  const Icon = is_folder ? FolderIcon : FileIcon;
  const has_children = is_folder && element.children.length;
  const navigate = useNavigate();
  const [{ isDragging }, _dragRef] = useDrag({
    type: element.type,
    item: {
      id: element.id,
      name: element.name,
      type: element.type,
      index: sibling_index,
    },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });
  const [{ isOver, canDrop }, _dropRef] = useDrop(
    {
      accept: ["file", "folder"],
      drop: (_item, _monitor) => {
        // const didDrop = monitor.didDrop()
        // if(didDrop) return
        // const from_id=item.id
        // const to_id=element.id
        // move_element_by_id(from_id, to_id);
      },
      hover: (_item: any) => {
        // console.log(item.index, sibling_index);
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    },
    [element.id]
  );
  const {open_create_form, open_edit_form} = use_menu({ element: element });
  const is_selected = selected_element?.id === element.id;
  return (
    <Collapsible
      // ref={(node) => {
      //   if (element.type === "folder") {
      //     return dragRef(dropRef(node));
      //   } else {
      //     return dragRef(node);
      //   }
      // }}
      className={cn(
        "group/collapsible w-full cursor-move border border-transparent",
        isOver && "bg-zinc-100",
        canDrop && "bg-white border-dashed",
        isDragging && "opacity-50",
        is_selected && "bg-zinc-500 bg-opacity-10"
      )}
      id={element.id}
      onClick={(e) => {
        e.stopPropagation();
        select_element(element.id);
        navigate(
          `/project/${current_project_id}/${element.type}/${element.id}`
        );
      }}
    >
      <SidebarMenuItem>
        <CollapsibleTrigger className="w-full">
          <SidebarMenuButton
            className={cn("hover:bg-transparent")}
            isActive={is_selected}
          >
            <Icon
              size={18}
              className={cn("text-gray-500", is_selected && "text-blue-500")}
            />
            <TextWrap
              type="p4"
              className={cn("flex-1", is_selected && "font-bold text-blue-500")}
            >
              {element.name}{" "}
              {has_children ? `(${element.children.length})` : ""}
            </TextWrap>
            <CustomDropdown
              menu={{
                label: "Actions",
              }}
              items={[
                {
                  name: "folder",
                  label: "New Folder",
                  Icon: FolderIcon,
                  on_click: () => open_create_form("folder"),
                  hide: !is_folder,
                },
                {
                  name: "file",
                  label: "New File",
                  Icon: FileIcon,
                  on_click: () => open_create_form("file"),
                  hide: !is_folder,
                },
                {
                  name: "edit",
                  label: "Edit",
                  Icon: Edit3Icon,
                  on_click: open_edit_form,
                },
                {
                  name: "delete",
                  label: "Delete",
                  Icon: TrashIcon,
                  on_click: () => {
                    remove_element_by_id(element.id);
                  },
                },
              ]}
            >
              <MoreVerticalIcon size={18} />
            </CustomDropdown>
          </SidebarMenuButton>
        </CollapsibleTrigger>
        {has_children ? (
          <CollapsibleContent>
            <SidebarMenuSub className="mr-0 px-0 border-l-zinc-500">
              <SidebarMenuSubItem>
                {element.children.map((child, index) => (
                  <FileAndFolder
                    element={child}
                    key={index}
                    sibling_index={index}
                  />
                ))}
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </CollapsibleContent>
        ) : null}
      </SidebarMenuItem>
    </Collapsible>
  );
};

export interface FileAndFoldersProps {
  element: FileAndFoldersType;
  sibling_index?: number;
}
