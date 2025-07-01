import * as React from "react";
import {
  IconCamera,
  IconChartBar,
  IconFileAi,
  IconFileDescription,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";

import { NavMain } from "@/components/dashboard/nav-main";
import { NavSecondary } from "@/components/dashboard/nav-secondary";
import { NavUser } from "@/components/dashboard/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { BadgeEuro, ShoppingBag } from "lucide-react";
import type { SidebarMenuItemType } from "@/lib/types";

const data = {
  user: {
    name: "Kareem Muhammad",
    email: "kimoomar007@gmail.com",
    avatar: "/assets/me.jpg",
  },

  navMain: [
    {
      title: "Customers",
      url: "/",
      icon: IconUsers,
    },
    {
      title: "Catalog",
      url: "#",
      icon: IconListDetails,
      items: [
        {
          title: "Products",
          url: "/products",
          icon: ShoppingBag,
        },
        {
          title: "Brands",
          url: "/brands",
          icon: BadgeEuro,
        },
        {
          title: "Categories",
          url: "/categories",
          icon: IconFolder,
        },
      ],
    },
    {
      title: "Orders",
      url: "#",
      icon: IconChartBar,
    },
    {
      title: "Blogs",
      url: "#",
      icon: IconFolder,
    },
    {
      title: "Enquiries",
      url: "#",
      icon: IconReport,
    },
  ] as SidebarMenuItemType[],

  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      url: "#",
      isActive: true,
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ] as SidebarMenuItemType[],

  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ] as SidebarMenuItemType[],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link to="/">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Ecom Admin</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
