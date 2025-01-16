import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { FloatingBubbleMenu } from "./FloatingBubbleMenu";

const companyNav = [
  {
    name: "Learning Hub",
    icon: "fluent:book-information-24-regular",
    children: [
      { name: "Courses", icon: "fluent:video-clip-24-regular", link: "/dashboard/courses" },
      { name: "Roadmap Generator", icon: "fluent:road-24-regular", link: "/dashboard/roadmap" },
      { name: "AI Mock Test", icon: "fluent:clipboard-task-24-regular", link: "/dashboard/mocktest" },
      { name: "Crash Course Generator", icon: "fluent:flash-24-regular", link: "/dashboard/crashcourse" },
    ],
  },
  {
    name: "Career Development",
    icon: "fluent:briefcase-24-regular",
    children: [
      { name: "Resume Builder", icon: "fluent:document-edit-24-regular", link: "/dashboard/resume" },
      { name: "Mock Interview", icon: "fluent:person-voice-24-regular", link: "/dashboard/mockinterview" },
      { name: "Code Editor", icon: "fluent:code-24-regular", link: "/dashboard/editor" },
    ],
  },
  {
    name: "Community Space",
    icon: "fluent:people-community-24-regular",
    children: [
      { name: "Discussion", icon: "fluent:chat-24-regular", link: "/dashboard/discussion" },
      { name: "Mentoring", icon: "fluent:person-feedback-24-regular", link: "/dashboard/mentor" },
    ],
  },
  {
    name: "Events & Updates",
    icon: "fluent:calendar-ltr-24-regular",
    children: [
      { name: "Events", icon: "fluent:calendar-star-24-regular", link: "/dashboard/events" },
    ],
  },
  {
    name: "Account Settings",
    icon: "fluent:settings-24-regular",
    children: [
      { name: "Settings", icon: "fluent:options-24-regular", link: "/dashboard/settings" },
    ],
  },
];

export function CourseSidebar({ data }) {
  const { state } = useSidebar();
  const [activeItem, setActiveItem] = useState(null);

  const handleItemClick = (item) => {
    setActiveItem(activeItem === item.name ? null : item.name);
  };

  return (
    <Sidebar className={cn(
      "border-r border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-800 transition-all duration-300 ease-in-out",
      state === "collapsed" ? "w-16" : "w-64"
    )}>
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-2">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Icon icon="fluent:book-globe-24-filled" className="w-8 h-8 text-blue-600" />
          </div>
          {state === "expanded" && (
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
            >
              Campus++
            </motion.h2>
          )}
        </div>
        <Link
         href={`/dashboard`}
         className="mt-6 flex items-center space-x-3 overflow-x-hidden">
          <Avatar className="w-10 h-10 border-2 border-blue-500">
            <AvatarImage src={data?.pic} alt={data?.username} />
            <AvatarFallback>{data?.username?.charAt(0)}</AvatarFallback>
          </Avatar>
          {state === "expanded" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p className="text-sm font-medium text-gray-800 dark:text-white">{data?.username}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{data?.email}</p>
            </motion.div>
          )}
        </Link>
      </SidebarHeader>
      <Separator className="my-2" />
      <SidebarContent className="px-3 overflow-y-hidden">
        <SidebarMenu>
          {companyNav.map((item) => (
            <SidebarMenuItem key={item.name}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        "w-full justify-start rounded-lg transition-all duration-200 ease-in-out mb-5 ",
                        activeItem === item.name
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-200 font-semibold"
                          : "hover:bg-gray-100 dark:hover:bg-gray-800"
                      )}
                      onClick={() => handleItemClick(item)}
                    >
                      <div className={cn("flex items-center py-2 px-3", state === "collapsed" && "justify-center")}>
                        <Icon icon={item.icon} className={cn(
                          "w-10 h-10",
                          state === "expanded" ? "mr-3" : "mx-auto",
                          activeItem === item.name
                            ? "text-blue-600 dark:text-blue-400"
                            : "text-gray-600 dark:text-gray-400"
                        )} />
                        {state === "expanded" && (
                          <span className="text-base font-medium">{item.name}</span>
                        )}
                      </div>
                    </SidebarMenuButton>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="bg-gray-800 text-white py-1 px-2 text-xs rounded">
                    <p>{item.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <AnimatePresence>
                {activeItem === item.name && item.children && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden ml-6 mt-2"
                  >
                    <FloatingBubbleMenu items={item.children} />
                  </motion.div>
                )}
              </AnimatePresence>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4 mt-auto">
        <Separator className="mb-4" />
        <div className="text-xs text-center text-gray-500 dark:text-gray-400">
          © 2023 Campus++
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

