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
} from '@/components/ui/sidebar'
import { Settings, AreaChartIcon as ChartArea, Building2, ClipboardList, ListChecks, LogOut, User, X, Focus, MessageSquareText, Video, Gamepad2, BotMessageSquare, Briefcase } from 'lucide-react'

const companyNav = [
  { name: "Dashboard", icon: ChartArea, link: "/dashboard" },
  { name: "Courses", icon: ClipboardList, link: "/courses" },
  { name: "Assignments", icon: ListChecks, link: "/assignments" },
  { name: "Live Classes", icon: Video, link: "/live-classes" },
  { name: "Discussion", icon: MessageSquareText, link: "/discussion" },
  { name: "AI Tutor", icon: BotMessageSquare, link: "/ai-tutor" },
  { name: "Career", icon: Briefcase, link: "/career" },
  { name: "Settings", icon: Settings, link: "/settings" },
];

export function CourseSidebar() {
  const [status, setStatus] = React.useState(true)
  const [activeItem, setActiveItem] = React.useState('Dashboard')
  const router = useRouter()

  const handleLogout = () => {
    router.push('/login')
    localStorage.clear()
  }

  return (
    <Sidebar className="w-[280px] border-r">
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
          <div>
            <h2 className="text-lg font-semibold">
              <span className="text-blue-700">CodePathshala</span>
            </h2>
            <p className="text-sm text-muted-foreground">for Learner</p>
          </div>
        </motion.div>
        <Separator />
        <motion.div 
          className="p-3 flex items-center gap-3 text-sm rounded-lg bg-blue-100"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Building2 size={18} />
          <h2 className="font-medium">Harshit Nikam</h2>
        </motion.div>
      </SidebarHeader>
      <SidebarContent className="px-4">
        <SidebarMenu>
          <AnimatePresence>
            {companyNav.map((item) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <SidebarMenuItem>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <SidebarMenuButton
                          asChild
                          className={`w-full justify-start ${activeItem === item.name ? 'bg-primary/10 text-primary' : ''}`}
                          onClick={() => setActiveItem(item.name)}
                        >
                          <Link href={item.link} className="flex items-center">
                            <item.icon className="mr-2 h-4 w-4" />
                            {item.name}
                            {item.name === 'Assignments' && (
                              <Badge variant="destructive" className="ml-auto">3</Badge>
                            )}
                          </Link>
                        </SidebarMenuButton>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>{item.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </SidebarMenuItem>
              </motion.div>
            ))}
          </AnimatePresence>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4 space-y-4">
        <motion.div 
          className="flex items-center justify-between bg-muted rounded-lg p-2"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">Status:</span>
          <Switch
            checked={status}
            onCheckedChange={setStatus}
            className="data-[state=checked]:bg-primary"
          />
          <span className="text-sm font-medium">
            {status ? 'Online' : 'Offline'}
          </span>
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
            Logout
          </Button>
        </motion.div>
      </SidebarFooter>
    </Sidebar>
  )
}
