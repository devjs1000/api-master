import { Box } from "@/components/custom";
import { CustomDropdown } from "@/components/custom-shad";
import { use_form_global_state } from "@/state/form.state";
import { use_project_store } from "@/state/project.state";
import {  MoreVerticalIcon, PenIcon } from "lucide-react";
import {} from "react";

export const EndNav = (_props: IEndNavProps) => {
  const { open_form } = use_form_global_state();
  const { current_project } = use_project_store();
  return (
    <Box reset_ui className="flex justify-end">
      <CustomDropdown
        items={[
          {
            name: "edit_project",
            label: "Edit Project",
            Icon: PenIcon,
            on_click: () => {
              open_form(
                "project",
                {
                  description: current_project?.description || '',
                  name: current_project?.name || '',
                  tags: current_project?.tags || [],
                  id: current_project?.id,
                },
                {
                  title: "Edit Project",
                  description: "Edit the project details",
                }
              );
            },
          },
        ]}
        menu={{
          label: "Actions",
        }}
      >
        <MoreVerticalIcon size={24} />
      </CustomDropdown>
    </Box>
  );
};

interface IEndNavProps {}
