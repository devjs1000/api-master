import { QuickForm } from "../core/quick-form";
import use_form from "@/hooks/use-form";
import { use_project_store } from "@/states/project.state";
import { use_form_global_state } from "@/states/form.state";
import { create_mappable } from "@/utils/mappable.utils";

const FileForm = (_props: IProjectFormProps) => {
  const { form, close_form } = use_form_global_state();
  const { add_file, get_element_by_id, update_file } = use_project_store();
  const edit = form?.id;
  const form_data = edit ? get_element_by_id(form?.id) : form;
  const form_hook = use_form({
    initial_value: {
      name: form_data?.name,
      description: form_data?.description,
      tags: form_data?.tags,
      method: form_data?.method || "GET",
      url: form_data?.url || "http://",
    },
    async on_submit(values) {
      if (edit) {
        update_file({
          name: values.name,
          path: form?.path,
          description: values.description,
          tags: values.tags,
          method: values.method as MethodType,
          url: values.url as URLType,
        });
      } else {
        add_file({
          name: values.name,
          path: form?.path,
          description: values.description,
          tags: values.tags,
          method: values.method as MethodType,
          url: values.url as URLType,
        });
      }

      close_form();
    },
  });

  return (
    <QuickForm<typeof form_hook.values>
      form={form_hook}
      defination={{
        name: "Create API",
        description: "Create a new API",
        tags: ["create", "API"],
        children: [
          {
            core_type: "input",
            id: "name",
            type: "text",
            label: "Name",
            placeholder: "Enter the API name",
            required: true,
          },
          {
            core_type: "layout",
            type: "horizontal",
            id: "method_and_url",
            title: "Method and URL",
            description: "Method and URL for the file",
            hide: {
              title: true,
              description: true,
            },
            child_container: {
              class_name: "w-full flex flex-start gap-2",
            },
            children: [
              {
                core_type: "input",
                id: "method",
                type: "select",
                label: "Method",
                required: true,
                default_value: "GET",
                placeholder: "Select the method",
                props: {
                  data: create_mappable([
                    "GET",
                    "POST",
                    "PUT",
                    "PATCH",
                    "DELETE",
                  ]),
                },
                container: {
                  class_name: "w-[100px]",
                },
              },
              {
                core_type: "input",
                id: "url",
                type: "text",
                label: "URL",
                placeholder: "Enter the API url",
                required: true,
              },
            ],
          },
          {
            core_type: "input",
            id: "description",
            type: "textarea",
            label: "Description",
            placeholder: "Enter the API description",
            required: true,
          },
          {
            core_type: "input",
            id: "tags",
            type: "tag",
            label: "API Tags",
            placeholder: "Enter the API tags",
            required: false,
          },
          {
            core_type: "layout",
            type: "horizontal",
            id: "API_action",
            title: "Actions",
            description: "Actions for the API",
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

export default FileForm;

interface IProjectFormProps {}
