import * as React from "react";

import { NavList } from "@/components/nav-list";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Menudata } from "@/data";
import { ScrollArea } from "../ui/scroll-area";
import { Logo } from "../logo";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenuButton
          size="lg"
          className="h-[70px] hover:bg-transparent data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <Logo />
        </SidebarMenuButton>
      </SidebarHeader>
      {/* <Separator /> */}
      <SidebarContent>
        <ScrollArea>
          <NavList title="Geral" items={Menudata.navGeral} />
          <NavList title="Por Categorias" items={Menudata.navCategory} />
        </ScrollArea>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
