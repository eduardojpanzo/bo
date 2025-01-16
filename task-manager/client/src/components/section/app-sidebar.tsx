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
import { gettingData } from "@/lib/fecth";
import { CategoryModel } from "@/models/category.model";
import { DotSquare } from "lucide-react";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [categories, setCategories] = React.useState<CategoryModel[]>([]);
  const loadData = async () => {
    const resp = await gettingData<HttpResponseDataType<CategoryModel[]>>(
      CategoryModel.ENDPOINT
    );
    setCategories(resp.data);
  };

  React.useEffect(() => {
    loadData();
  }, []);

  const navCategory = [
    ...categories.map((category) => ({
      title: `${category.name}`,
      url: `/tasks/${category.id}`,
      icon: DotSquare,
    })),
  ];
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
          <NavList title="Por Categorias" items={navCategory} />
        </ScrollArea>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
