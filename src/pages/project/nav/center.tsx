import { Box, TextWrap } from "@/components/custom";
import { use_project_store } from "@/state/project.state";
import {} from "react";

export const CenterNav = (_props: ICenterNavProps) => {
  const { current_project } = use_project_store();
  return (
    <Box className="flex flex-col gap-1 flex-grow">
      <TextWrap className="block" type="h4">
        {current_project?.name || "No Project Selected"}
      </TextWrap>
      {current_project?.description && (
        <TextWrap className="block w-[50vw]" type="p4" ellipsis>
          {current_project.description}
        </TextWrap>
      )}
    </Box>
  );
};

interface ICenterNavProps {}
