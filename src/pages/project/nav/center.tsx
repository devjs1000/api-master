import { Box, TextWrap } from "@/components/custom";
import { use_project_store } from "@/states/project.state";
import {} from "react";

export const CenterNav = (_props: ICenterNavProps) => {
  const { current_project } = use_project_store();
  return (
    <Box reset_ui className="flex flex-col gap-1 flex-grow">
      <TextWrap className="block capitalize" type="h3">
        {current_project?.name || "No Project Selected"}
      </TextWrap>
      {current_project?.description && (
        <TextWrap className="block w-[50vw]" type="p3" ellipsis>
          {current_project.description}
        </TextWrap>
      )}
    </Box>
  );
};

interface ICenterNavProps {}
