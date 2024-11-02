import { DataTable } from "@/components/custom-shad/data-table";
import { create_columns } from "./columns";
import { CreateNewCard } from "@/components/custom-shad";
import { Container } from "@/components/custom";
import { CustomModal } from "@/components/custom-shad/custom-modal";
import { use_disclosure } from "@/hooks/use-disclosure";
import { QuickForm } from "../quick-form";
import use_form from "@/hooks/use-form";
import { use_project_store } from "@/state/project.state";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";

export const Projects = (_props: IProjectsProps) => {
  const { projects, add_project, open_project, remove_project } =
    use_project_store();
  const navigate = useNavigate();

  const columns = useMemo(() => {
    const custom_columns = create_columns({
      on_copy(project_id) {
        navigator.clipboard.writeText(project_id);
      },
      on_delete(project_id) {
        remove_project(project_id);
      },
      on_open(project_id) {
        const status = open_project(project_id);
        if (status) {
          navigate(`/project/${project_id}`);
        }
      },
    });
    return custom_columns;
  }, []);

  const disclosure = use_disclosure(false);
  const form = use_form({
    initial_value: {
      project_name: "",
      project_description: "",
      project_tags: [],
    },
    async on_submit(values) {
      add_project({
        name: values.project_name,
        description: values.project_description,
        tags: values.project_tags,
        id: Math.random().toString(36).substr(2, 9),
        created_at: new Date(),
        updated_at: new Date(),
        children: [],
      });
    },
  });

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
            async on_click() {
              await form.handle_submit();
              disclosure.on_close();
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
        <QuickForm<typeof form.values>
          form={form}
          defination={{
            name: "create_project",
            description: "Create a new project",
            tags: ["create", "project"],
            children: [
              {
                core_type: "layout",
                id: "project_layout",
                title: "Project Details",
                description: "Fill the details of the project",
                hide: {
                  title: true,
                  description: true,
                },
                children: [
                  {
                    core_type: "input",
                    id: "project_name",
                    type: "text",
                    label: "Name",
                    placeholder: "Enter the project name",
                    required: true,
                  },
                  {
                    core_type: "input",
                    id: "project_description",
                    type: "textarea",
                    label: "Description",
                    placeholder: "Enter the project description",
                    required: true,
                  },
                  {
                    core_type: "input",
                    id: "project_tags",
                    type: "tag",
                    label: "Project Tags",
                    placeholder: "Enter the project tags",
                    required: false,
                  },
                ],
              },
            ],
          }}
        />
      </CustomModal>
      <DataTable columns={columns} data={projects} />
    </Container>
  );
};

interface IProjectsProps {}
