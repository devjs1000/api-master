import { QuickForm } from "@/components/core/quick-form";
import { Box } from "@/components/custom";
import {} from "react";

export const ApiAboutEditor: React.FC<Props> = (props) => {
  return (
    <Box>
      <QuickForm
        form={props?.form}
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
          ],
        }}
      />
    </Box>
  );
};

interface Props {
  form: FormHookReturnType<Partial<ApiFile>>;
}
