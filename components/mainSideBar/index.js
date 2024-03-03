'use client'

import React from "react";
import { Archive, ArchiveX, File, Users, Send, Trash2 } from "lucide-react";
import { ResizablePanel } from "@/components/ui/resizable";
import { useState } from "react";
import { Nav } from "./nav/nav";
import { cn } from "@/lib/utils";

export const MainSideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <ResizablePanel
      collapsible={true}
      defaultSize={15}
      maxSize={15}
      minSize={7}
      onCollapse={() => {
        setIsCollapsed(true);
      }}
      onExpand={() => {
        setIsCollapsed(false);
      }}
      className={cn(
        isCollapsed && "min-w-[50px] transition-all duration-300 ease-in-out",
        !isCollapsed && "min-w-[150px]"
      )}
    >
      <Nav
        isCollapsed={isCollapsed}
        links={[
          {
            title: "Люди",
            icon: Users,
            path: "/people",
          },
          {
            title: "Дневник",
            icon: File,
            path: "/diary",
          }
        ]}
      />
    </ResizablePanel>
  );
};
