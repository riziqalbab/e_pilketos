import { AdminSidebar } from "@/components/AdminSidebar";
import { AppSidebar } from "@/components/App-sidebar";
import Navbar from "@/components/Navbar";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";

function AdminLayput({ children }: { children: React.ReactNode }) {
    return (
        <>
            <SidebarProvider>
                <AdminSidebar />
                {/* <SidebarTrigger/> */}
                <SidebarInset className="rounded">
                    <SidebarTrigger className="m-5 fixed" />
                    <Navbar />
                    <main>{children}</main>
                </SidebarInset>
            </SidebarProvider>
        </>
    );
}

export default AdminLayput;
