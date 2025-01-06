import { type LucideIcon } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router-dom";

export function NavList({
  items,
  title,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
  title: string;
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarMenu className="space-y-1">
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <NavLink
              to={`${item.url}`}
              className={({ isActive, isPending }) =>
                isActive ? "active" : isPending ? "pending" : ""
              }
            >
              <SidebarMenuButton
                tooltip={item.title}
                className="flex gap-2 items-center"
                size="default"
              >
                {item.icon && <item.icon />} <span>{item.title}</span>
              </SidebarMenuButton>
            </NavLink>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
