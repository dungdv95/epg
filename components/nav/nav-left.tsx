import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button, buttonVariants } from "../ui/button";
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

  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
    >
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
              <TooltipContent side="right" className="flex items-center gap-4">
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
    </div>
  );
}
