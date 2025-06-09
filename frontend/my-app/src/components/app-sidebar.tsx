"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  SquareTerminal,
  User,
  BarChart2,
  Settings2,
  Cpu,
  Database,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

import Link from 'next/link';
import LogoutButton from './LogoutButton';


// This is updated data using your original sidebar labels and URLs
// const data = {
//   user: {
//     name: "Sai Aditya",
//     email: "saiaditya@gmail.com",
//     avatar: "/avatars/aditya.jpg", // Replace with your actual avatar path
//   },
//   teams: [
//     {
//       name: "Project Alpha",
//       logo: GalleryVerticalEnd,
//       plan: "Developer",
//     },
//   ],
//   navMain: [
//     {
//       title: "Dashboard",
//       url: "/dashboard",
//       icon: SquareTerminal,
//       isActive: true,
//       items: [],
//     },
//     {
//       title: "Profile",
//       url: "/dashboard/profile",
//       icon: User,
//       items: [],
//     },
//     {
//       title: "Metrics",
//       url: "/dashboard/metrics",
//       icon: BarChart2,
//       items: [],
//     },
//     {
//       title: "Settings",
//       url: "/dashboard/settings",
//       icon: Settings2,
//       items: [],
//     },
//     {
//       title: "My System",
//       url: "/dashboard/mysystem",
//       icon: Cpu,
//       items: [],
//     },
//   ],
//   projects: [],
// }


const data = {
  user: {
    name: "Sai Aditya",
    email: "saiaditya@gmail.com",
    avatar: "/avatars/aditya.jpg",
  },
  teams: [
    {
      name: "Project Alpha",
      logo: GalleryVerticalEnd,
      plan: "Developer",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: SquareTerminal,
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
        },
    ],
    },
    {
      title: "Profile",
      url: "/dashboard/profile",
      icon: User,
      items: [
        {
          title: "Profile",
          url: "/dashboard/profile",
        },
      ],
    },
    {
      title: "Metrics",
      url: "/dashboard/metrics",
      icon: BarChart2,
      items: [
        {
          title: "Metrics",
          url: "/dashboard/metrics",
        },
      ],
    },
    
    // --- System Metrics Section ---
    {
      title: "System Metrics",
      url: "/dashboard/mysystem",
      icon: Cpu,
      items: [
        {
          title: "Aditya HP Laptop",
          url: "/dashboard/mysystem",
        },
        {
          title: "Dell Laptop",
          url: "/dashboard/mysystem/dell",
        },
      ],
    },
    // --- Docker Section ---
    {
      title: "Docker Metrics",
      url: "/dashboard/docker",
      icon: Database,
      items: [
        {
          title: "Overview (Coming Soon)",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings2,
      items: [
          {
            title: "Settings",
            url: "/dashboard/settings",
          },
        ],
      },
  ],
  projects: [],
}


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
