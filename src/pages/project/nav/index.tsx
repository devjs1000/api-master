import { Box } from "@/components/custom";
import {} from "react";
import { StartNav } from "./start";
import { CenterNav } from "./center";
import { EndNav } from "./end";
import { use_process_store } from "@/states";

export const ProjectNav: React.FC<Props> = () => {
  const { navbar } = use_process_store();
  if (!navbar.project) return null;
  return (
    <Box reset_ui className="flex items-center w-full gap-2 border-b">
      <StartNav />
      <CenterNav />
      <EndNav />
    </Box>
  );
};

interface Props {}
