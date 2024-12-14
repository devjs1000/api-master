import { Box, Container, TextWrap } from "@/components/custom";
import { CustomDropdown } from "@/components/custom-shad";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { use_menu } from "@/hooks/use-menu";
import { use_process_store } from "@/states";
import { use_project_store } from "@/states/project.state";
import { formatDistance } from "date-fns";
import {
  Edit3Icon,
  FileIcon,
  InfoIcon,
  MoreVerticalIcon,
  TrashIcon,
} from "lucide-react";
import { useEffect } from "react";

export const APINav: React.FC<Props> = (_props) => {
  const { remove_element_by_id, selected_element } = use_project_store();
  const { set_navbar } = use_process_store();
  const { open_edit_form } = use_menu({
    element: selected_element || undefined,
  });
  useEffect(() => {
    set_navbar("project", false);
  }, [selected_element]);
  if (selected_element?.type === "folder" || !selected_element?.id) return null;
  const updated_at_date = new Date(selected_element?.updated_at || "");
  const created_at_date = new Date(selected_element?.created_at || "");
  const is_updated = updated_at_date?.getTime() !== created_at_date?.getTime();
  return (
    <Container className="bg-white flex flex-col gap-2">
      <Box reset_ui className="flex items-center gap-4">
        <FileIcon size={24} className="text-gray-500" />
        <TextWrap type="h2">{selected_element?.name}</TextWrap>
        <Separator orientation="vertical" className="h-5" />
        <Box reset_ui className="flex items-center gap-4">
          <TextWrap type="p3" className="text-gray-500">
            Created on{" "}
            {formatDistance(selected_element?.created_at || "", new Date(), {
              addSuffix: true,
            })}
          </TextWrap>
          {is_updated && <Separator orientation="vertical" className="h-5" />}
          {is_updated && (
            <TextWrap type="p3" className="text-gray-500">
              Last updated on{" "}
              {formatDistance(selected_element?.updated_at || "", new Date(), {
                addSuffix: true,
              })}
            </TextWrap>
          )}
        </Box>
        <CustomDropdown
          items={[
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
                remove_element_by_id(selected_element?.id);
              },
            },
          ]}
          menu={{
            label: "Folder Actions",
            hide: false,
          }}
        >
          <MoreVerticalIcon size={18} />
        </CustomDropdown>
      </Box>
      <Box reset_ui className="flex items-center gap-4 mt-2 ">
        {selected_element?.tags?.map?.((tag, index) => (
          <Badge key={index} variant={"default"}>
            {tag}
          </Badge>
        ))}
      </Box>
      <Box reset_ui className="flex items-center gap-2 mt-4 ">
        <InfoIcon size={18} className="text-zinc-500" />
        <TextWrap type="p2" className="text-zinc-500 ">
          {selected_element.description}
        </TextWrap>
      </Box>
    </Container>
  );
};

interface Props {}
