"use client";

import { useEffect, useState } from "react";
import { TooltipProvider } from "./ui/tooltip";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./ui/resizable";
import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";
import {
  AlertCircle,
  Archive,
  ArchiveX,
  Facebook,
  File,
  Inbox,
  MessagesSquare,
  MoonIcon,
  PenBox,
  Search,
  Send,
  ShoppingCart,
  SunIcon,
  Trash2,
  Users2,
} from "lucide-react";
import { NavLeft } from "./nav/nav-left";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { navItems } from "./nav/menu";
import { useElementSize } from "./hooks/use-element-size";
import { useWindowSize } from "./hooks/use-window-size";
import { useStore } from "./nav/store";

interface LayoutProps {
  children: React.ReactNode;
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

export default function LayoutSide({
  children,
  defaultLayout = [16, 86],
  defaultCollapsed = false,
  navCollapsedSize,
}: LayoutProps) {
  const { width, height } = useWindowSize();
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const { setTheme } = useTheme();
  const [minSize, setMinsize] = useState<number>(10);
  const [maxSize, setMaxSize] = useState<number>(14);
  const pageCurrent = useStore((state) => state.pageCurrent);

  useEffect(() => {
    if (width && width < 1370) {
      setMinsize(12);
      setMaxSize(16);
    }
  }, [width]);

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes
          )}`;
        }}
        className="h-full items-stretch"
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={minSize}
          maxSize={maxSize}
          onCollapse={() => {
            setIsCollapsed(true);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              true
            )}`;
          }}
          onExpand={() => {
            setIsCollapsed(false);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              false
            )}`;
          }}
          className={cn(
            isCollapsed &&
              "min-w-[50px] transition-all duration-300 ease-in-out"
          )}
        >
          {isCollapsed ? (
            <div className={cn("flex h-[52px] items-center justify-center")}>
              <div className="flex flex-shrink-0 items-center">
                <img
                  className="block h-8 w-auto"
                  src={`/assets/logo.png`}
                  alt=""
                />
              </div>
            </div>
          ) : (
            <div
              className={cn("flex h-[52px] items-center justify-between px-4")}
            >
              <span className="text-2xl font-medium text-[#5867dd] ">
                {pageCurrent.name}
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-7 w-7" size="icon">
                    <SunIcon className="h-3 w-3 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <MoonIcon className="absolute h-3 w-3 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
          <Separator />
          <NavLeft isCollapsed={isCollapsed} links={navItems} />
          {/* <Separator /> */}
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[1]}>
          <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
            {children}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
