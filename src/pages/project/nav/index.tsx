import { Box } from "@/components/custom";
import {} from "react";
import { StartNav } from "./start";
import { CenterNav } from "./center";
import { EndNav } from "./end";

export const ProjectNav: React.FC<Props> = () => {
  return (
    <Box reset_ui className="flex items-center w-full gap-2">
      <StartNav />
      <CenterNav />
      <EndNav />
    </Box>
  );
};

interface Props {}
