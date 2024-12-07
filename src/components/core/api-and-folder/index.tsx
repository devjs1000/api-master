import { Box, TextWrap } from "@/components/custom";
import { CustomDropdown } from "@/components/custom-shad";
import { Button } from "@/components/ui/button";
import { use_project_store } from "@/states/project.state";
import {
  FileIcon,
  FolderIcon,
  MoreVerticalIcon,
  TrashIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export const APIAndFolder = ({ elements }: IAPIAndFolderProps) => {
  const { select_element, current_project_id, remove_element_by_id } =
    use_project_store();
  const navigate = useNavigate();
  const is_array = Array.isArray(elements);

  if (is_array) {
    return (
      <Box reset_ui className="flex flex-wrap gap-4">
        {elements.map((element, index) => (
          <APIAndFolder elements={element} key={index} />
        ))}
      </Box>
    );
  }

  const is_folder = elements.type === "folder";
  const Icon = is_folder ? FolderIcon : FileIcon;

  return (
    <Box
      reset_ui
      className="px-4 py-2 border rounded-md w-[200px]  cursor-pointer hover:bg-zinc-50 bg-white"
      onClick={(e) => {
        e?.stopPropagation?.();
        select_element(elements.id);
        navigate(
          `/project/${current_project_id}/${elements.type}/${elements.id}`
        );
      }}
    >
      <Box reset_ui className="flex items-center gap-2 justify-between">
        <Box reset_ui className="flex items-center gap-2">
          <Icon className="text-sm text-gray-500" size={18} />
          <TextWrap type="p2" ellipsis>
            {elements.name}
          </TextWrap>
        </Box>
        <CustomDropdown
          items={[
            {
              name: "delete",
              label: "Delete",
              Icon: TrashIcon,
              on_click: () => {
                remove_element_by_id(elements.id);
              },
            },
          ]}
          menu={{
            label: "Actions",
            hide: false,
          }}
        >
          <Button
            variant={"ghost"}
            className="text-sm"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <MoreVerticalIcon size={18} />
          </Button>
        </CustomDropdown>
      </Box>
    </Box>
  );
};

interface IAPIAndFolderProps {
  elements: FileAndFoldersType[] | FileAndFoldersType;
}
