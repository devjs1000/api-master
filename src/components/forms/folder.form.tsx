import {} from "react";
import { QuickForm } from "../core/quick-form";
import use_form from "@/hooks/use-form";
import { use_project_store } from "@/state/project.state";
import { use_form_global_state } from "@/state/form.state";

const FolderForm = (_props: IProjectFormProps) => {
  const { form, close_form } = use_form_global_state();
  const { add_folder } = use_project_store();
  const form_hook = use_form({
    initial_value: {
      name: form?.name,
      description: form?.description,
      tags: form?.tags,
    },
    async on_submit(values) {
      add_folder({
        name: values.name,
        path: form?.path,
        description: values.description,
        tags: values.tags,
      });
      close_form();
    },
  });

  return (
    <QuickForm<typeof form_hook.values>
      form={form_hook}
      defination={{
        name: "Create Folder",
        description: "Create a new folder",
        tags: ["create", "folder"],
        children: [
          {
            core_type: "input",
            id: "name",
            type: "text",
            label: "Name",
            placeholder: "Enter the folder name",
            required: true,
          },
          {
            core_type: "input",
            id: "description",
            type: "textarea",
            label: "Description",
            placeholder: "Enter the folder description",
            required: true,
          },
          {
            core_type: "input",
            id: "tags",
            type: "tag",
            label: "folder Tags",
            placeholder: "Enter the folder tags",
            required: false,
          },
          {
            core_type: "layout",
            type: "horizontal",
            id: "folder_action",
            title: "Actions",
            description: "Actions for the folder",
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

export default FolderForm;

interface IProjectFormProps {}
