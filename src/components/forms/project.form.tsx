import {} from "react";
import { QuickForm } from "../core/quick-form";
import use_form from "@/hooks/use-form";
import { use_project_store } from "@/states/project.state";
import { use_form_global_state } from "@/states/form.state";

const ProjectForm = (_props: IProjectFormProps) => {
  const { form, close_form } = use_form_global_state();
  const { add_project, update_project } = use_project_store();
  const project_id = form?.id;
  const form_hook = use_form({
    initial_value: {
      project_name: form?.name || "",
      project_description: form?.description || "",
      project_tags: form?.tags || [],
    },
    async on_submit(values) {
      if (project_id) {
        update_project(project_id, {
          name: values.project_name,
          description: values.project_description,
          tags: values.project_tags,
        });
      } else {
        add_project({
          name: values.project_name,
          description: values.project_description,
          tags: values.project_tags,
        });
      }
      close_form();
    },
  });

  return (
    <QuickForm<typeof form_hook.values>
      form={form_hook}
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
          {
            core_type: "layout",
            type: "horizontal",
            id: "project_action",
            title: "Actions",
            description: "Actions for the project",
            hide: {
              title: true,
              description: true,
            },
            children: [
              {
                core_type: "input",
                id: "submit_button",
                type: "button",
                props: {
                  variant: "default",
                  onClick: form_hook.handle_submit,
                },
                children: "Submit",
              },
              {
                core_type: "input",
                id: "cancel_button",
                type: "button",
                props: {
                  onClick: () => {
                    form_hook.handle_reset();
                    close_form();
                  },
                  variant: "destructive",
                },
                children: "Cancel",
              },
            ],
          },
        ],
      }}
    />
  );
};

export default ProjectForm;

interface IProjectFormProps {}
