import * as React from "react";

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

import { BadgeEuro, Camera, ChartBar, File, Folder, FolderArchive, HelpCircle, List, ScrollText, Search, Settings, ShoppingBag, Users } from "lucide-react";
import type { SidebarMenuItemType } from "@/lib/types";

import useAuth from "@/hooks/use-auth";

const data = {
  navMain: [
    {
      title: "Customers",
      url: "/customers",
      icon: Users,
    },
    {
      title: "Catalog",
      url: "#",
      icon: List,
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
          icon: FolderArchive,
        },
        // {
        //   title: "Colors",
        //   url: "/colors",
        //   icon: Circle,
        // },
      ],
    },
    {
      title: "Merketing",
      url: "#",
      icon: List,
      items: [
        {
          title: "Coupons",
          url: "/coupons",
          icon: ShoppingBag,
        },
      ],
    },
    {
      title: "Gallery",
      url: "/gallery",
      icon: Camera,
      items: [
        {
          title: "Images",
          url: "/gallery",
        },
        {
          title: "Add Image",
          url: "/gallery/add-image",
        },
      ],
    },
    {
      title: "Orders",
      url: "/orders",
      icon: ChartBar,
    },
    {
      title: "Blogs",
      url: "/blogs",
      icon: Folder,
      items: [
        {
          title: "Blog Categories",
          url: "/blog-category",
        },
        {
          title: "Blog List",
          url: "/blogs",
        },
        {
          title: "Add Blog",
          url: "/add-blog",
        },
      ],
    },
    {
      title: "Enquiries",
      url: "/enquiries",
      icon: ScrollText,
    },
  ] as SidebarMenuItemType[],

  navClouds: [
    {
      title: "Capture",
      icon: Camera,
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
      icon: File,
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
      icon: File,
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
      icon: Settings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: HelpCircle,
    },
    {
      title: "Search",
      url: "#",
      icon: Search,
    },
  ] as SidebarMenuItemType[],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth();

  console.log("AppSidebar rendered with user:", user);

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
                {/* <InnerShadowTop className="!size-5" /> */}
                <span className="text-base font-semibold">Ecom Admin</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary
          items={data.navSecondary
            .filter(item => !!item.icon)
            .map(item => ({ ...item, icon: item.icon! }))
          }
          className="mt-auto"
        />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={user!} />
      </SidebarFooter>
    </Sidebar>
  );
}
