import { Box } from "@/components/custom";
import { Button } from "@/components/ui/button";
import { use_navigations } from "@/hooks/use-navigations";
import { ArrowLeftIcon } from "lucide-react";
import {} from "react";

export const StartNav = (_props: IStartNavProps) => {
  const { go_back } = use_navigations();
  return (
    <Box reset_ui className="flex justify-start">
      <Button onClick={go_back} variant={"ghost"} >
        <ArrowLeftIcon size={24} />
      </Button>
    </Box>
  );
};

interface IStartNavProps {}
