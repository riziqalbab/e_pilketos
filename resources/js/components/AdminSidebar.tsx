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
import { Link } from "@inertiajs/react"

const items = [
  {
    title: "ADMIN",
    url: "/admin",
  },
  {
    title: "KATEGORI",
    url: "/admin/kategori",
  },
  {
    title: "TAMBAH KANDIDAT",
    url: "/admin/tambah",
  },
  {
    title: "KELAS",
    url: "/admin/kelas",
  },
  {
    title: "DPT",
    url: "/admin/dpt",
  },
  {
    title: "WAKTU",
    url: "/admin/waktu",
  },
  
]

export function AdminSidebar() {
  return (
    <Sidebar variant="inset">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      
                      <span>{item.title}</span>
                    </Link>
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
