import { AppSidebar } from "@/components/App-sidebar";
import Navbar from "@/components/Navbar";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";

function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <SidebarProvider>
                <AppSidebar />
                {/* <SidebarTrigger/> */}
                <SidebarInset className="rounded">
                    <SidebarTrigger className="m-5" />
                    <Navbar />
                    <main>{children}</main>
                </SidebarInset>
            </SidebarProvider>
        </>
    );
}

export default MainLayout;
