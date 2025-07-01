export type SidebarMenuItemType = {
  title: string;
  url: string;
  icon?: React.FC;
  items?: SidebarMenuItemType[];
};
