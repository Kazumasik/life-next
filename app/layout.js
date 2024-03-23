"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import * as React from "react";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Toaster } from "@/components/ui/sonner"
import { MainSideBar } from "@/components/mainSideBar";
import Providers from "./providers";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className}>
        <Providers>
          <ResizablePanelGroup
            autoSaveId="persistance"
            direction="horizontal"
            className="min-h-screen items-stretch"
          >
            <MainSideBar></MainSideBar>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={85}>{children}</ResizablePanel>
          </ResizablePanelGroup>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
