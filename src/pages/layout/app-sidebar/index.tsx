import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
} from "@/components/ui/sidebar";
import { items } from "@/pages/layout/app-sidebar/items";
import { app_config } from "@/configs/app.config";
import { Link, useLocation } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

export const AppSidebar = (_props: IAppSidebarProps) => {
  const is_loading = false;
  const location = useLocation();
  return (
    <Sidebar variant="sidebar">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            {is_loading ? (
              <Skeleton className="w-[100px] h-[10px] rounded-full" />
            ) : (
              app_config.name
            )}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                if (is_loading) return <SidebarMenuSkeleton key={item.title} />;
                const is_active = location.pathname === item.url;
                const icon_props = is_active
                  ? { fill: "currentColor" }
                  : { fill: "none" };
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={is_active ? "bg-zinc-200 font-semibold" : ""}
                    >
                      <Link to={item.url}>
                        <item.icon {...icon_props} />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

interface IAppSidebarProps {}
