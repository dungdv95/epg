"use client";

import { useEffect, useState } from "react";
import * as React from "react";
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
import { SidebarItem, navItems } from "./nav/menu";
import { useElementSize } from "./hooks/use-element-size";
import { useWindowSize } from "./hooks/use-window-size";
import { useStore } from "./nav/store";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface LayoutProps {
  children: React.ReactNode;
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

export default function LayoutSide({
  children,
  defaultLayout = [18, 82],
  defaultCollapsed = false,
  navCollapsedSize,
}: LayoutProps) {
  const pathName = usePathname();
  const { width, height } = useWindowSize();
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const { setTheme } = useTheme();
  const [minSize, setMinsize] = useState<number>(10);
  const [maxSize, setMaxSize] = useState<number>(14);
  const [selectedPage, setSelectedPage] = useState<SidebarItem[]>(() => {
    let page = navItems.find((el) => pathName.includes(el.url));
    if (page) {
      return page.items;
    }
    return [];
  });
  const [namePage, setNamePage] = useState<string>(() => {
    let page = navItems.find((el) => pathName.includes(el.url));
    if (page) {
      return page.name;
    }
    return "Home";
  });
  const pageCurrent = useStore((state) => state.pageCurrent);

  useEffect(() => {
    if (width && width < 1370) {
      setMinsize(14);
      setMaxSize(16);
    }
  }, [width]);

  useEffect(() => {
    let page = navItems.find((el) => pathName.includes(el.url));
    if (page) {
      setSelectedPage(page?.items);
      setNamePage(page.name);
    }
  }, [pathName]);

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
              <span className="text-xl font-medium text-[#5867dd] truncate">
                {namePage}
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-7 w-7 min-w-7"
                    size="icon"
                  >
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
          <div className="h-screen flex flex-col">
            <div className="h-[52px] flex justify-between	items-center px-4 shadow-sm">
              {width && width > 1200 ? (
                <div>
                  <NavigationMenu>
                    <NavigationMenuList className="space-x-4">
                      {selectedPage.map((page, index) => (
                        <NavigationMenuItem key={index} className="">
                          {page.items.length > 0 ? (
                            <>
                              <NavigationMenuTrigger>
                                {page.name}
                              </NavigationMenuTrigger>
                              <NavigationMenuContent>
                                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                  {page.items.map((item) => (
                                    <ListItem
                                      key={item.name}
                                      title={item.title}
                                      href={item.url}
                                    >
                                      {item.name}
                                    </ListItem>
                                  ))}
                                </ul>
                              </NavigationMenuContent>
                            </>
                          ) : (
                            <Link href={`${page.url}`} legacyBehavior passHref>
                              <NavigationMenuLink
                                className={cn(
                                  navigationMenuTriggerStyle(),
                                  "h-8 px-6 focus:bg-[#f1f5f9] focus:text-[#5d78ff] dark:focus:bg-gray-700",
                                  page.url === pathName &&
                                    "bg-[#f1f5f9] text-[#5d78ff] dark:bg-gray-700"
                                )}
                              >
                                {page.name}
                              </NavigationMenuLink>
                            </Link>
                          )}
                        </NavigationMenuItem>
                      ))}
                    </NavigationMenuList>
                  </NavigationMenu>
                </div>
              ) : (
                <></>
              )}
              <div>user</div>
            </div>
            {/* <div
              data-orientation="horizontal"
              role="none"
              className="shrink-0 bg-border h-[1px] w-full"
            ></div> */}
            <div className="flex min-w-0 flex-auto flex-col overflow-hidden p-4">
              {children}
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
