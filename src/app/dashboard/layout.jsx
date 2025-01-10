"use client";

import { CourseSidebar } from "@/components/Course/CourseSidebar";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Headset } from "lucide-react";
import Link from "next/link";

export default function RootLayout({ children }) {
  const handleVideoCall = () => {
    window.open("https://framevr.io/classroommmm", "_blank");
  };
  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen overflow-hidden">
        <CourseSidebar />
        <SidebarInset className="flex flex-col">
          <header className="flex h-16 items-center justify-between gap-4  p-4 bg-background">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <h1 className="text-xl font-semibold">Campus++ Dashboard</h1>
            </div>
            <Button
              variant="default"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => handleVideoCall()}
            >
              <Headset className="mr-2 h-4 w-4" />
              Join VR
            </Button>
          </header>
          <main className="w-full overflow-auto p-6">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
