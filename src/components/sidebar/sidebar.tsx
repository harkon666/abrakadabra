import { ChevronDown } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarMenuButton,
  SidebarMenuSub,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { menuList } from "./sidebar-list";
import { useMatchRoute, useNavigate } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function AppSidebar() {
  const nav = useNavigate({ from: "/" });
  const matchRoute = useMatchRoute();
  const active = (key?: string) => {
    return matchRoute({ to: "/" + key });
  };

  return (
    <Sidebar>
      <SidebarContent key={"sidebar-content"} className="p-4">
        {menuList.map((item) =>
          !item.sub ? (
            <SidebarMenuButton
              key={item.title}
              disabled={!item.sub}
              asChild
              onClick={() => nav({ to: "/" + item.url })}
              size={"sm"}
              isActive={!!active(item.key)}
              className={"px-2 w-full"}
            >
              <div className="flex gap-1">
                <item.icon />
                <span>{item.title}</span>
              </div>
            </SidebarMenuButton>
          ) : (
            <Collapsible className="group/collapsible">
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  key={item.title}
                  disabled={!item.sub}
                  asChild
                  size={"sm"}
                  className={cn(
                    "px-2 w-full",
                    matchRoute({ to: "/" + item.key }) &&
                      "bg-muted-foreground/10"
                  )}
                >
                  <div className="flex gap-1">
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronDown className="absolute right-6" />
                  </div>
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.sub?.map((sub) => (
                    <SidebarMenuButton
                      asChild
                      size={"sm"}
                      onClick={() => nav({ to: "/" + sub.url })}
                      isActive={!!active(sub.key)}
                      className={cn("px-2")}
                    >
                      <div className="flex gap-1">
                        <span>{sub.title}</span>
                      </div>
                    </SidebarMenuButton>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </Collapsible>
          )
        )}
      </SidebarContent>
    </Sidebar>
  );
}
