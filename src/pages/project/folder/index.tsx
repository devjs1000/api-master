import { APIAndFolder } from "@/components/core/api-and-folder";
import { Box, Container, TextWrap } from "@/components/custom";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { StatusInfo } from "@/pages/(info)/status-info";
import { use_project_store } from "@/state/project.state";
import { formatDistance } from "date-fns";
import { FolderIcon, InfoIcon } from "lucide-react";

const Folder = () => {
  const { selected_element } = use_project_store();
  if (selected_element?.type === "file") {
    return (
      <StatusInfo title="Invalid Selection">
        Select a folder to view its contents. You have selected a file.
      </StatusInfo>
    );
  }
  if (!selected_element) {
    return (
      <StatusInfo title="No Folder Selected">
        Select a folder to view its contents.
      </StatusInfo>
    );
  }
  const children = selected_element?.children;
  const is_children_empty = !children || children.length === 0;
  const is_updated =
    new Date(selected_element?.updated_at).getTime() !==
    new Date(selected_element?.created_at).getTime();

  return (
    <Container className="bg-zinc-100 p-0" full_size>
      <Container className="bg-white flex flex-col gap-2">
        <Box reset_ui className="flex items-center gap-4">
          <FolderIcon size={24} className="text-gray-500" />
          <TextWrap type="h2">{selected_element.name}</TextWrap>
          <TextWrap type="p3" className="text-gray-500">
            {is_children_empty ? `Empty` : `(${children.length} items)`}
          </TextWrap>
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
        </Box>
        <Box reset_ui className="flex items-center gap-4 mt-2 ">
          {selected_element.tags.map((tag, index) => (
            <Badge key={index} variant={"default"} className="bg-blue-500">
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
      {is_children_empty ? (
        <StatusInfo title="Empty Folder" className="h-auto justify-start p-0">
          The selected folder is empty.
        </StatusInfo>
      ) : null}
      <Box>
        <APIAndFolder elements={children} />
      </Box>
    </Container>
  );
};

export default Folder;
