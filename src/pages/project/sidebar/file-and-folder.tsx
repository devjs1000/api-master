import { TextWrap } from "@/components/custom";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { use_project_store } from "@/states/project.state";
import { CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { FileIcon, FolderIcon } from "lucide-react";
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
  } = use_project_store();
  const is_folder = element.type === "folder";
  const Icon = is_folder ? FolderIcon : FileIcon;
  const has_children = is_folder && element.children.length;
  const navigate = useNavigate();
  const [{ isDragging }, dragRef] = useDrag({
    type: element.type,
    item: {
      id: element.id,
      name: element.name,
      type: element.type,
      index: sibling_index,
    },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });
  const [{ isOver, canDrop }, dropRef] = useDrop(
    {
      accept: ["file", "folder"],
      drop: (item, monitor) => {
        // const didDrop = monitor.didDrop()
        // if(didDrop) return
        // const from_id=item.id
        // const to_id=element.id
        // move_element_by_id(from_id, to_id);
      },
      hover: (item: any) => {
        // console.log(item.index, sibling_index);
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    },
    [element.id]
  );

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
        is_selected && "bg-blue-500 bg-opacity-10"
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
          <SidebarMenuButton className={"hover:bg-transparent"}>
            <Icon />
            <TextWrap
              type="p4"
              className={cn(is_selected && "font-bold text-blue-500")}
            >
              {element.name}{" "}
              {has_children ? `(${element.children.length})` : ""}
            </TextWrap>
          </SidebarMenuButton>
        </CollapsibleTrigger>
        {has_children ? (
          <CollapsibleContent>
            <SidebarMenuSub className="mr-0 px-0 border-l-blue-500">
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
