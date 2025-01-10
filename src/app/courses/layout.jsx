'use client'

import { CourseSidebar } from "@/components/Course/CourseSidebar"
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"

export default function RootLayout({ children }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen overflow-hidden">
        <CourseSidebar />
        <SidebarInset className="flex-1 flex flex-col">
          <header className="flex h-16 items-center gap-4 border-b px-6 bg-background">
            <SidebarTrigger />
            <h1 className="text-xl font-semibold">LEARNfromHOME Dashboard</h1>
          </header>
          <main className="flex-1 mx-auto overflow-auto p-6">
            {children} 
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

