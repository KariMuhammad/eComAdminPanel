import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import type { SidebarMenuItemType } from "@/lib/types";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

export function NavMain({ items }: { items: SidebarMenuItemType[] }) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => {
            if (item.items) {
              return (
                <Collapsible key={item.title}>
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton>
                        <div className="w-full flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            {item.icon && <item.icon />}
                            <span>{item.title}</span>
                          </div>
                          <div className="block">
                            <ChevronDown />
                          </div>
                        </div>
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((subItem) => (
                          <Link to={subItem.url} key={subItem.title}>
                            <SidebarMenuSubItem>
                              <SidebarMenuButton>
                                <span className="flex items-center gap-1">
                                  {subItem.icon && <subItem.icon />}
                                  {subItem.title}
                                </span>
                              </SidebarMenuButton>
                            </SidebarMenuSubItem>
                          </Link>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              );
            } else {
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url || ""}>
                      <div className="flex items-center gap-1">
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            }
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
