import { TextWrap } from "@/components/custom";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { FileIcon, FolderIcon } from "lucide-react";
import { useDrag, useDrop } from "react-dnd";

export const FileAndFolder = ({
  element,
  sibling_index,
}: FileAndFoldersProps) => {
  const is_folder = element.type === "folder";
  const Icon = is_folder ? FolderIcon : FileIcon;
  const has_children = is_folder && element.children.length;
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
  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: ["file", "folder"],
    drop: (item) => {
      console.log(
        `Dropped ${item?.type} ${item?.id} into folder ${element.id}`,
        item.index,
        sibling_index
      );
    },
    hover: (item: any) => {
      console.log(item.index, sibling_index);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <Collapsible
      ref={(node) => {
        if (element.type === "folder") {
          return dragRef(dropRef(node));
        } else {
          return dragRef(node);
        }
      }}
      className={cn(
        "group/collapsible w-full cursor-move border border-transparent",
        isOver && "bg-zinc-100",
        canDrop && "bg-white border-dashed",
        isDragging && "opacity-50"
      )}
      id={element.id}
    >
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
        )}
      </SidebarMenuItem>
    </Collapsible>
  );
};

export type FileAndFoldersType = ApiFolder | ApiFile;
export interface FileAndFoldersProps {
  element: FileAndFoldersType;
  sibling_index?: number;
}
