'use client'

import { PersonalCenterMenu } from '@/constants/menu'
import { cn } from '@/lib/utils'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../ui/sidebar'

interface PersonalCenterSidebarProps {
  activeBar: string
  toggleActiveBar: (title: string) => void
}

export default function PersonalCenterSidebar({
  activeBar,
  toggleActiveBar,
}: PersonalCenterSidebarProps) {
  return (
    <Sidebar className="absolute top-0 left-0 h-[600px]" variant="inset">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-0!">
              {PersonalCenterMenu.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a
                      className={cn(
                        'flex justify-center py-7 hover:bg-[#f0f0f5]! dark:hover:bg-[#212121]! cursor-pointer rounded-[3px]!',
                        activeBar === item.title &&
                          'bg-[#f0f0f5] dark:bg-[#212121]',
                      )}
                      onClick={() => {
                        toggleActiveBar(item.title)
                      }}
                    >
                      <span>{item.title}</span>
                    </a>
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
