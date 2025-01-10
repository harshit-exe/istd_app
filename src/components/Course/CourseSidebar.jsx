'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar'
import { Settings, AreaChartIcon as ChartArea, Building2, ClipboardList, ListChecks, LogOut, User, X, Focus, MessageSquareText, Video, Gamepad2, BotMessageSquare, Briefcase } from 'lucide-react'

const companyNav = [
  { name: "Courses", icon: ClipboardList, link: "/courses"},
  { name: "Resume Generator", icon: ListChecks, link: "courses/resume",  },
  { name: "Mentoring", icon: Video, link: "/mentor" },
  { name: "Discussion", icon: MessageSquareText, link: "/discussion" },
  { name: "AI Tutor", icon: BotMessageSquare, link: "/aitutor" },
  { name: "Roadmap", icon: Briefcase, link: "/roadmap" },
  { name: "Mock Interview", icon: Settings, link: "/mockinterview" },
  { name: "Settings", icon: Settings, link: "/settings" },
];

export function CourseSidebar() {
  const [status, setStatus] = React.useState(true)
  const [activeItem, setActiveItem] = React.useState('Dashboard')
  const router = useRouter()
  const { state } = useSidebar()

  const handleLogout = () => {
    router.push('/login')
    localStorage.clear()
  }

  const sidebarVariants = {
    expanded: { width: 240 },
    collapsed: { width: 0 },
  }

  return (
    <motion.div
      variants={sidebarVariants}
      animate={state}
      transition={{ duration: 0.3 }}
      className="z-40 h-screen bg-background border-r overflow-hidden"
    >
      <Sidebar className="h-full">
        <SidebarHeader className="p-4 space-y-4">
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CP</AvatarFallback>
            </Avatar>
            <AnimatePresence>
              {state === 'expanded' && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <h2 className="text-lg font-semibold">
                    <span className="text-blue-700">CodePathshala</span>
                  </h2>
                  <p className="text-sm text-muted-foreground">for Learner</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          <Separator />
          <motion.div 
            className="p-3 flex items-center gap-3 text-sm rounded-lg bg-blue-100"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Building2 size={18} />
            <AnimatePresence>
              {state === 'expanded' && (
                <motion.h2
                  className="font-medium"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  Harshit Nikam
                </motion.h2>
              )}
            </AnimatePresence>
          </motion.div>
        </SidebarHeader>
        <SidebarContent className="px-3">
          <SidebarMenu>
            {companyNav.map((item) => (
              <SidebarMenuItem key={item.name}>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SidebarMenuButton
                        asChild
                        className={`w-full justify-start ${activeItem === item.name ? 'bg-primary/10 text-primary' : ''}`}
                        onClick={() => setActiveItem(item.name)}
                      >
                        <Link href={item.link} className="flex items-center py-2">
                          <item.icon className="h-4 w-4 mr-3" />
                          {state === 'expanded' && (
                            <span className="text-sm font-medium">{item.name}</span>
                          )}
                          {item.badge && state === 'expanded' && (
                            <Badge variant="destructive" className="ml-auto text-xs">{item.badge}</Badge>
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{item.name}</p>
                      {item.badge && <Badge variant="destructive" className="ml-2">{item.badge}</Badge>}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-4 space-y-4">
          <motion.div 
            className="bg-muted rounded-lg p-3"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="flex items-center justify-between">
              <User className="h-4 w-4 text-muted-foreground" />
              <Switch
                checked={status}
                onCheckedChange={setStatus}
                className="data-[state=checked]:bg-primary"
              />
            </div>
            {state === 'expanded' && (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="mt-2"
                >
                  <span className="text-sm font-medium">
                    {status ? 'Online' : 'Offline'}
                  </span>
                </motion.div>
              </AnimatePresence>
            )}
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Button
              variant="ghost"
              className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              {state === 'expanded' && <span className="text-sm font-medium">Logout</span>}
            </Button>
          </motion.div>
        </SidebarFooter>
      </Sidebar>
    </motion.div>
  )
}

