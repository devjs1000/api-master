import { Button, ButtonProps } from "@/components/ui/button";
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { User2, ChevronUp, LogOutIcon } from "lucide-react";

export const ProjectSidebarFooter = ({
  bottom_actions,
}: ProjectSidebarFooterProps) => {
  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton>
                <User2 /> Username
                <ChevronUp className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="top"
              className="w-[--radix-popper-anchor-width] bg-white shadow-xl rounded-lg border border-zinc-200 px-1 "
            >
              {bottom_actions.map(({ action, name, Icon, variant }, index) => {
                return (
                  <DropdownMenuItem key={index} className="w-full my-1">
                    <Button
                      variant={variant || "ghost"}
                      onClick={action}
                      className="w-full text-start justify-start px-4 rounded-lg"
                    >
                      {name}
                      {Icon && <Icon className="ml-auto" />}
                    </Button>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
};

interface ProjectSidebarFooterProps {
  bottom_actions: Actions[];
}

export interface Actions {
  name: string;
  action: () => void;
  variant?: ButtonProps["variant"];
  Icon?: typeof LogOutIcon;
}
