import { DataTable } from "@/components/custom-shad/data-table";
import { create_columns } from "./columns";
import { CreateNewCard } from "@/components/custom-shad";
import { Container } from "@/components/custom";
import { CustomModal } from "@/components/custom-shad/custom-modal";
import { use_disclosure } from "@/hooks/use-disclosure";

export const Projects = (_props: IProjectsProps) => {
  const columns = create_columns({
    on_copy(project_id) {
      console.log(project_id);
      navigator.clipboard.writeText(project_id);
    },
    on_delete(project_id) {
      console.log(project_id);
    },
    on_open(project_id) {
      console.log(project_id);
    },
  });

  const disclosure = use_disclosure(false);

  return (
    <Container reset_ui className="flex flex-wrap gap-2">
      <CustomModal
        trigger={
          <CreateNewCard w="200px" h="100px" tooltip="Create New Project" />
        }
        title="Create New Project"
        description="Create a new project by filling the form below."
        footer_buttons={[
          {
            title: "Create",
            on_click() {
              disclosure.on_close()
            },
            variant: "default",
          },
          {
            title: "Cancel",
            on_click() {
              disclosure.on_close();
            },
            variant: "ghost",
          },
        ]}
        disclosure={disclosure}
      >
        <div>Form</div>
      </CustomModal>
      <DataTable
        columns={columns}
        data={[
          {
            name: "Test Project",
            description: "Test Description",
            tags: ["test", "new"],
            created_at: new Date(),
            id: "test",
          },
        ]}
      />
    </Container>
  );
};

interface IProjectsProps {}
