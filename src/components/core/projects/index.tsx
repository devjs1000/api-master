import { DataTable } from "@/components/custom-shad/data-table";
import { create_columns } from "./columns";
import { Container } from "@/components/custom";
import { use_disclosure } from "@/hooks/use-disclosure";
import use_form from "@/hooks/use-form";
import { use_project_store } from "@/state/project.state";
import { useNavigate } from "react-router-dom";
import { useCallback, useMemo, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { local_get_project } from "@/utils";
import { ProjectModal } from "./project-modal";

export const Projects = (_props: IProjectsProps) => {
  const project = use_project_store();
  const navigate = useNavigate();
  const [project_id, set_project_id] = useState<null | string>(null);
  const disclosure = use_disclosure(false);
  const form = use_form({
    initial_value: {
      project_name: "",
      project_description: "",
      project_tags: [],
    },
    async on_submit(values) {
      if (project_id) {
        console.log("project_id", project_id);
        const stored_project = local_get_project(project_id);
        project?.update_project(project_id, {
          ...stored_project,
          name: values.project_name,
          description: values.project_description,
          tags: values.project_tags,
          updated_at: new Date(),
        });
      } else {
        project?.add_project({
          name: values.project_name,
          description: values.project_description,
          tags: values.project_tags,
          id: Math.random().toString(36).substr(2, 9),
          created_at: new Date(),
          updated_at: new Date(),
          children: [],
        });
      }
    },
  });
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
        form?.update_value("project_name", stored_project.name);
        form?.update_value("project_description", stored_project.description);
        form?.update_value("project_tags", stored_project.tags);
        disclosure.on_open();
        set_project_id(curr_project_id);
      }
    },
    [form, disclosure?.on_open, set_project_id]
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
      <ProjectModal<typeof form.values>
        disclosure={disclosure}
        form={form}
        set_project_id={set_project_id}
        project_id={project_id}
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
