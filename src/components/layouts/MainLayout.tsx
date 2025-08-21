import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import {
  CirclePlus,
  Fullscreen,
  LayoutDashboard,
  Newspaper,
} from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";
import Header from "../molecules/Header";
import { Toaster } from "sonner";

export default function MainLayout() {
  const location = useLocation();

  // Menu items.
  const items = [
    {
      title: "All Posts",
      url: "/",
      icon: Newspaper,
    },
    {
      title: "Add New Article",
      url: "/add-new-article",
      icon: CirclePlus,
    },
    {
      title: "Preview",
      url: "/preview",
      icon: Fullscreen,
    },
  ];

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" className="!border-0">
        <SidebarHeader className="px-4 bg-white">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="data-[slot=sidebar-menu-button]:!p-1.5 hover:bg-transparent"
              >
                <Link to={"/"}>
                  {/* <IconInnerShadowTop className="!size-5" /> */}
                  <LayoutDashboard />
                  <span className="text-base font-semibold">
                    Artikel Vision.
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent className="bg-white">
          <SidebarGroup>
            <Separator />
            <SidebarGroupContent className="px-1 py-2">
              <SidebarMenu className="space-y-1">
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <Link to={item.url}>
                      <SidebarMenuButton
                        className={cn(
                          "h-fit py-2",
                          (location.pathname === item.url ||
                            (item.url === "/" &&
                              location.pathname.startsWith("/edit-article"))) &&
                            "bg-slate-50 font-medium shadow-sm "
                        )}
                        asChild
                      >
                        <div>
                          <item.icon />
                          <span>{item.title}</span>
                        </div>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <main className="flex-1 p-3 overflow-hidden">
        <div className="w-full h-full border rounded-2xl shadow-md overflow-auto">
          <Header />
          <Outlet />
        </div>
        <Toaster position="bottom-right" duration={2000} />
      </main>
    </SidebarProvider>
  );
}
