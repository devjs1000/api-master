import { CreateNewCard } from "@/components/custom-shad";
import { CustomModal } from "@/components/custom-shad/custom-modal";
import { QuickForm } from "../quick-form";
import { Dispatch, SetStateAction } from "react";
import { DisclosureReturnType } from "@/hooks/use-disclosure";
import { UseFormReturn } from "@/hooks/use-form";

export function ProjectModal<T>({
  disclosure,
  form,
  set_project_id,
  project_id,
}: IProjectModalProps<T>) {
  return (
    <CustomModal
      trigger={
        <CreateNewCard
          w="200px"
          h="100px"
          tooltip={project_id ? "Update Project" : "Create New Project"}
          onClick={() => {
            set_project_id(null);
            form?.handle_reset();
          }}
        />
      }
      title={project_id ? "Update Project" : "Create New Project"}
      description={
        project_id
          ? "Update the project details"
          : "Fill the details of the project"
      }
      footer_buttons={[
        {
          title: project_id ? "Update" : "Create",
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
  );
}

interface IProjectModalProps<T> {
  disclosure: DisclosureReturnType;
  form: UseFormReturn<T>;
  project_id?: string | null;
  set_project_id: Dispatch<SetStateAction<string | null>>;
}
