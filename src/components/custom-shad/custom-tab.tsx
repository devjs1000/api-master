import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Box } from "../custom/layouts";
import { Button } from "../ui/button";

export const CustomTab: React.FC<Props> = (props) => {
  const [active_tab, set_active_tab] = useState(props?.default_value);
  return (
    <Box reset_ui className={cn("w-full", props?.container_class_name)}>
      <Box reset_ui className="flex flex-row gap-2 bg-white border-b">
        {props?.tabs.map((tab, i) => (
          <Button
            key={i}
            className={cn(
              "px-4 py-1",
              active_tab === tab.value ? "underline" : "text-zinc-400 font-light"
              
            )}
            variant={"link"}
            onClick={() => set_active_tab(tab.value)}
          >
            {tab.value}
          </Button>
        ))}
      </Box>
      <Box reset_ui className="mt-2">
        {props?.tabs.find((tab) => tab.value === active_tab)?.content}
      </Box>
    </Box>
  );
};

interface Props {
  default_value: string;
  container_class_name?: string;
  tabs_list_props?: any;
  tabs: Array<{
    value: string;
    content: React.ReactNode;
  }>;
}
