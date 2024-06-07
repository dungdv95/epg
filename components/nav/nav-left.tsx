import { useLoginStore } from "@/app/login/store";
import API from "@/configs/API";
import { cn } from "@/lib/utils";
import { Power } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button, buttonVariants } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { SidebarItem } from "./menu";
import { useStore } from "./store";

interface NavProps {
  isCollapsed: boolean;
  links: SidebarItem[];
}

export function NavLeft({ links, isCollapsed }: NavProps) {
  const pathName = usePathname();
  const pageCurrent = useStore((state) => state.pageCurrent);
  const setPageCurrent = useStore((state) => state.setPageCurrent);
  const router = useRouter();
  const logout = useLoginStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    router.push(API.AUTH.LOGOUT);
  };

  return (
    <div
      data-collapsed={isCollapsed}
      className="h-full group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
    >
      <ScrollArea className="h-full flex-auto">
        <nav className="grid gap-2 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
          {links.map((link, index) =>
            isCollapsed ? (
              <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href={link.url}
                    className={cn(
                      buttonVariants({
                        variant: pathName.includes(link.url)
                          ? "default"
                          : "ghost",
                        size: "icon",
                      }),
                      "h-9 w-9",
                      pathName.includes(link.url) &&
                        "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                    )}
                  >
                    <link.icon className="h-4 w-4" />
                    <span className="sr-only">{link.title}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="flex items-center gap-4"
                >
                  {link.title}
                </TooltipContent>
              </Tooltip>
            ) : (
              <Link
                key={index}
                href={link.url}
                className={cn(
                  buttonVariants({
                    variant: pathName.includes(link.url) ? "default" : "ghost",
                    size: "sm",
                  }),
                  pathName.includes(link.url) &&
                    "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                  "justify-start"
                )}
              >
                <link.icon className="mr-2 h-4 w-4" />
                {link.title}
              </Link>
            )
          )}
        </nav>
      </ScrollArea>
      <div className="h-12 p-2 mb-[46px] flex items-center justify-center">
        {!isCollapsed ? (
          <Button
            className="h-9 w-full justify-start dark:hover:bg-muted dark:hover:text-white"
            size={"sm"}
            variant={"ghost"}
            onClick={handleLogout}
          >
            <Power className="mr-2 h-4 w-4" /> Đăng xuất
          </Button>
        ) : (
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button
                className="h-9 w-9 dark:hover:bg-muted dark:hover:text-white"
                size={"icon"}
                variant={"ghost"}
                onClick={handleLogout}
              >
                <Power className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" className="flex items-center gap-4">
              Đăng xuất
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </div>
  );
}
