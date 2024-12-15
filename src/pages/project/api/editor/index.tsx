import { Box } from "@/components/custom";
import { CustomTab } from "@/components/custom-shad/custom-tab";
import use_form from "@/hooks/use-form";
import { use_project_store } from "@/states/project.state";
import {} from "react";
import { ApiAboutEditor } from "./about";
import { ApiRequestMaker } from "./request";

export const APIEditor: React.FC<Props> = (_props) => {
  const { selected_element } = use_project_store();
  const selected_values = selected_element as ApiFile;
  const form_hook = use_form<Partial<ApiFile>>({
    initial_value: selected_values,
    async on_submit() {
      console.log("submit");
    },
  });
  return (
    <Box reset_ui>
      <CustomTab
        default_value="about"
        container_class_name="w-full"
        tabs={[
          {
            value: "about",
            content: <ApiAboutEditor form={form_hook} />,
          },
          {
            value: "request",
            content: <ApiRequestMaker form={form_hook} />,
          },
        ]}
      />
    </Box>
  );
};

interface Props {}
