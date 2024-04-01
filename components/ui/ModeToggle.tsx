"use client";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { Button } from "./Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./DropdownMenu";

import { useHotkeys } from "react-hotkeys-hook";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  useHotkeys(["t"], () => {
    setTheme(theme === "ligh" ? "dark" : "light");
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="h-9 shrink-0">
          <SunIcon className="w-h-4 h-4 rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0" />
          <MoonIcon className="w-h-4 h-4 rotate-0 scale-100 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light Mode
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark Mode
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}