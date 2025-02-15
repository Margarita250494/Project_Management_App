"use client";
import { Moon, Search, Settings, Sun,AlignJustify } from "lucide-react";
import Link from "next/link";
import { inputStyle } from "./style";
import { useAppDispatch,useAppSelector } from "@/app/redux";
import { setIsDarkMode, setIsSidebarCollapsed } from "@/state";


export const Navbar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed);
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  return (
    <header>
      <nav
        role="navigation"
        aria-label="support navigation"
        className="flex items-center justify-between bg-white px-4 py-3 dark:bg-black"
      >
        {/*Search bar */}
        <form 
            role="search"
            aria-label="Submit search"
            className="flex items-center gap-8">
          {/*menu button */}
          {!isSidebarCollapsed ? null : (
            <button aria-controls="sidebar collapsed" onClick={()=>dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}>
              <AlignJustify strokeWidth="1" className="h-8 w-8 dark:text-white" />
            </button>
          )}
          <div className="relative flex h-min w-[12.5rem]">
            <button
              type="button"
              role="search"
              className="absolute left-[0.25rem] top-1/2 mr-2"
            >
              <Search
                strokeWidth="1.5"
                className="h-5 w-5 -translate-y-1/2 transform cursor-pointer dark:text-white"
              />
            </button>
            <label htmlFor="search" className="sr-only">
              Find what you need
            </label>
            <input
              id="search"
              type="search"
              className={inputStyle}
              placeholder="Search..."
            />
          </div>
        </form>

        {/*ICONS */}
        <div className="flex items-center">
          <button 
            aria-controls="dark/light mode" 
            onClick={()=>dispatch(setIsDarkMode(!isDarkMode))}
            className={isDarkMode ? `rounded p-2 dark:hover:bg-gray-700` : `rounded p-2 hover:bg-gray-100`}>
            {isDarkMode ? (
              <Sun strokeWidth="1.5" className="h-6 w-6 cursor-pointer dark:text-white"/>
            ) : (
              <Moon strokeWidth="1.5" className="h-6 w-6 cursor-pointer dark:text-white"/>
            )}
          </button>
          <Link
            href="/settings"
            className={isDarkMode ? `h-min w-min rounded p-2 dark:hover:bg-gray-700` : `h-min w-min rounded p-2 hover:bg-gray-100`}
            aria-label="Go to Settings"
          >
            <Settings
              strokeWidth="1.5"
              className="h-6 w-6 cursor-pointer dark:text-white"
            />
          </Link>
          <hr className="ml-2 mr-5 hidden min-h-[2em] w-[0.1rem] bg-gray-200 md:inline-block" />
        </div>
      </nav>
    </header>
  );
};
