import { DataTable } from "@/components/custom-shad/data-table";
import { create_columns } from "./columns";
import { Container } from "@/components/custom";
import { use_project_store } from "@/state/project.state";
import { useNavigate } from "react-router-dom";
import { useCallback, useMemo } from "react";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { local_get_project } from "@/utils";
import { CreateNewCard } from "@/components/custom-shad";
import { use_form_global_state } from "@/state/form.state";

export const Projects = (_props: IProjectsProps) => {
  const project = use_project_store();
  const { open_form } = use_form_global_state();
  const navigate = useNavigate();
  const on_copy = useCallback((project_id: string) => {
    navigator.clipboard.writeText(project_id);
    toast?.({
      title: "Copied",
      description: "Project ID copied to clipboard",
      variant: "default",
      action: <ToastAction altText="Close">Ok</ToastAction>,
      duration: 2000,
    });
  }, []);
  const on_delete = useCallback(
    (project_id: string) => {
      project?.remove_project(project_id);
    },
    [project]
  );
  const on_open = useCallback(
    (project_id: string) => {
      const status = project?.open_project(project_id);
      if (status) {
        navigate(`/project/${project_id}`);
      }
    },
    [project, navigate]
  );
  const on_edit = useCallback(
    (curr_project_id: string) => {
      const stored_project = local_get_project(curr_project_id);
      if (stored_project) {
        open_form(
          "project",
          {
            _id: curr_project_id,
            name: stored_project.name,
            description: stored_project.description,
            tags: stored_project.tags,
          },
          {
            title: "Edit Project",
            description: "Edit the details of the project",
          }
        );
      }
    },
    [open_form]
  );
  const columns = useMemo(() => {
    const custom_columns = create_columns({
      on_copy,
      on_delete,
      on_open,
      on_edit,
    });
    return custom_columns;
  }, []);
  return (
    <Container reset_ui className="flex flex-wrap gap-2">
      <CreateNewCard
        w="200px"
        h="100px"
        tooltip={"Create New Project"}
        onClick={() => {
          open_form(
            "project",
            {
              name: "",
              description: "",
              tags: [],
            },
            {
              title: "Create New Project",
              description: "Fill the details of the project",
            }
          );
        }}
      />
      <DataTable
        columns={columns}
        data={project?.projects}
        on_click_row={(data) => {
          on_open(data.id);
        }}
      />
    </Container>
  );
};

interface IProjectsProps {}
