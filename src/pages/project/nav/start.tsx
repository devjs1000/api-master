import { Box } from "@/components/custom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { use_navigations } from "@/hooks/use-navigations";
import { use_process_store } from "@/states";
import { ArrowLeftIcon } from "lucide-react";
import {} from "react";

export const StartNav = (_props: IStartNavProps) => {
  const { go_back } = use_navigations();
  const { toggle_sidebar } = use_process_store();
  return (
    <Box reset_ui className="flex justify-start items-center pl-4" id="project-nav-start">
      <SidebarTrigger onClick={() => toggle_sidebar("project")} />
      <Separator orientation="vertical" className="h-5 mx-4" />
      <Button onClick={go_back} variant={"ghost"}>
        <ArrowLeftIcon size={28} />
      </Button>
    </Box>
  );
};

interface IStartNavProps {}
