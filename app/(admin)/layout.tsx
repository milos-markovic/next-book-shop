import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { ModeToggle } from "@/components/ModeToggle"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="p-4 w-full">
        <div className="flex justify-between">
          <SidebarTrigger />
          <ModeToggle />
        </div>
        <section className="mt-4 pl-5">
            {children}
        </section>
      </main>
    </SidebarProvider>
  )
} 