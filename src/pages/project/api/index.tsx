import { Container } from "@/components/custom";
import { Separator } from "@/components/ui/separator";
import { StatusInfo } from "@/pages/(info)/status-info";
import { use_project_store } from "@/states/project.state";
import { APINav } from "./nav";

const Api = () => {
  const { selected_element } = use_project_store();
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

  return (
    <Container className="bg-zinc-100 p-0" full_size>
      <APINav />
      <Separator />
    </Container>
  );
};

export default Api;
