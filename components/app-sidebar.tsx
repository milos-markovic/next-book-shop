import { ChartColumnStacked , ShoppingCart, BookOpen, ListOrdered, ListFilter  } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Logo from "./Logo"

// Menu items.
const items = [
  {
    title: "Category",
    url: "/admin/categories",
    icon: ChartColumnStacked,
  },
  {
    title: "Books",
    url: "/admin/books",
    icon: BookOpen,
  },
  {
    title: "Shoping carts",
    url: "/admin/cart",
    icon: ShoppingCart,
  },
  {
    title: "Orders",
    url: "/admin/orders",
    icon: ListOrdered,
  },
  {
    title: "Filters",
    url: "/admin/filters",
    icon: ListFilter,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="mb-4 text-primary">
            <Logo />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="text-foreground font-semibold">
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}