import {} from "react";
import { StartNav } from "./start";
import { CenterNav } from "./center";
import { EndNav } from "./end";
import { Box } from "@/components/custom";

const ProjectNav = (_props: IProjectNavProps) => {
  return (
    <Box reset_ui className="flex items-center w-full gap-4">
      <StartNav />
      <CenterNav />
      <EndNav />
    </Box>
  );
};

export default ProjectNav;

interface IProjectNavProps {}
