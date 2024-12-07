import { Box, Container, TextWrap } from "@/components/custom";
import { CustomDropdown } from "@/components/custom-shad";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { StatusInfo } from "@/pages/(info)/status-info";
import { use_form_global_state } from "@/states/form.state";
import { use_project_store } from "@/states/project.state";
import { formatDistance } from "date-fns";
import {
  Edit3Icon,
  FileIcon,
  InfoIcon,
  MoreVerticalIcon,
  TrashIcon,
} from "lucide-react";

const Api = () => {
  const { remove_element_by_id, get_path_from_id, selected_element } =
    use_project_store();
  const { open_form } = use_form_global_state();
  if (selected_element?.type === "folder") {
    return (
      <StatusInfo title="Invalid Selection">
        Select a file to view its contents. You have selected a folder.
      </StatusInfo>
    );
  }
  if (!selected_element) {
    return (
      <StatusInfo title="No File Selected">
        Select a file to view its contents.
      </StatusInfo>
    );
  }
  const open_edit_form = () => {
    const path = get_path_from_id(selected_element.id);
    if (!path) return;
    open_form(
      selected_element.type,
      { name: selected_element.name, path: path, id: selected_element.id },
      {
        title: `Edit ${selected_element.type}`,
        description: `Edit ${selected_element.type}`,
      }
    );
  };

  const is_updated =
    new Date(selected_element?.updated_at).getTime() !==
    new Date(selected_element?.created_at).getTime();
  return (
    <Container className="bg-zinc-100 p-0" full_size>
      <Container className="bg-white flex flex-col gap-2">
        <Box reset_ui className="flex items-center gap-4">
          <FileIcon size={24} className="text-gray-500" />
          <TextWrap type="h2">{selected_element.name}</TextWrap>
          <Separator orientation="vertical" className="h-5" />
          <Box reset_ui className="flex items-center gap-4">
            <TextWrap type="p3" className="text-gray-500">
              Created on{" "}
              {formatDistance(selected_element.created_at, new Date(), {
                addSuffix: true,
              })}
            </TextWrap>
            {is_updated && <Separator orientation="vertical" className="h-5" />}
            {is_updated && (
              <TextWrap type="p3" className="text-gray-500">
                Last updated on{" "}
                {formatDistance(selected_element.updated_at, new Date(), {
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
                  remove_element_by_id(selected_element.id);
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
          {selected_element.tags.map((tag, index) => (
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
      <Separator />
    </Container>
  );
};

export default Api;
