"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle({ isCollapsed }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [buttonText, setButtonText] = useState("");
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  useEffect(() => {
    setButtonText(theme);
  }, [theme]);
  return isCollapsed ? (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="h-9 w-9"
    >
      {buttonText === "dark" ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </Button>
  ) : (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="justify-start"
    >
      {buttonText === "dark" ? (
        <Sun className="mr-2 h-4 w-4" />
      ) : (
        <Moon className="mr-2 h-4 w-4" />
      )}
      <span>Сменить тему</span>
    </Button>
  );
}
