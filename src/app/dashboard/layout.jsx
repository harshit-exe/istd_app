'use client'
import React, { useEffect, useState } from 'react';
import { CourseSidebar } from "@/components/Course/CourseSidebar";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Icon } from '@iconify/react';
import { BaseApiUrl } from '@/utils/constanst';

export default function DashboardLayout({ children }) {
  const handleVideoCall = () => {
    window.open("https://framevr.io/classroommmm", "_blank");
  };

  const [data, setData] = useState([]);

  const fetchUser = async () => {
    const response = await fetch(`${BaseApiUrl}/user/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const json = await response.json();
    if (json) {
      console.log(json);
      setData(json.user.user);
    }
  };
  
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
        <CourseSidebar data={data} />
        <SidebarInset className="flex flex-col flex-grow">
          <header className="flex h-16 items-center justify-between p-3 gap-4 border-b border-gray-200 bg-white px-6 dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                <Icon icon="fluent:list-24-filled" className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </SidebarTrigger>
              <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Campus<span className='text-blue-500'>++</span>  Dashboard</h1>
            </div>
            <Button
              variant="default"
              className="bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200"
              onClick={handleVideoCall}
            >
              <Icon icon="fluent:video-24-filled" className="mr-2 h-4 w-4" />
              Join Metaverse
            </Button>
          </header>
          <main className="flex-grow overflow-y-auto p-6">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

