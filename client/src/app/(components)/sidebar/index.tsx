"use client";

import {
  LockIcon,
  Home,
  Briefcase,
  Search,
  Settings,
  UserRound,
  UsersRound,
  EyeClosed,
  ChevronUp,
  ChevronDown,
  AlertCircle,
  ShieldAlert,
  AlertTriangle,
  AlertOctagon,
  Layers3,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { SidebarLink } from "./SidebarLink";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/state";
import { animationList, getSidebarStyle } from "./style";
import { useGetProjectsQuery } from "@/state/api";

export const Sidebar = () => {
  const [showProjects, setShowProjects] = useState(true);
  const [showPriority, setShowPriority] = useState(true);

  const { data: projects } = useGetProjectsQuery();

  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );

  const sidebarStyle = getSidebarStyle(isSidebarCollapsed);
  return (
    <aside aria-label="Sidebar" className={sidebarStyle}>
      <div className="flex h-full w-full flex-col justify-start">
        {/* TOP LOGO */}
        <div className="z-50 flex min-h-[3.313rem] w-64 items-center justify-between bg-white px-6  py-8 dark:bg-black">
          <p className="text-xl font-bold text-gray-800 dark:text-white">
            MARGOLIST
          </p>
          {!isSidebarCollapsed && (
            <button
              className="py-3"
              onClick={() =>
                dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))
              }
              aria-label="Collapse sidebar"
            >
              <EyeClosed
                className="h-6 w-6 text-gray-800 hover:text-gray-500 dark:text-white"
                role="img"
              />
            </button>
          )}
        </div>
        {/* TEAM */}
        <section
          className="flex items-center gap-5 border-b border-t border-gray-200 px-8 py-4 dark:border-gray-700"
          aria-labelledby="team-section"
        >
          <h3 className="sr-only">Team</h3>
          <Image
            className="rotate-90"
            src="/logo.png"
            alt="Margo Team logo"
            width={40}
            height={40}
          />
          <div>
            <h4
              id="team-section"
              className="text-md font-bold tracking-wide dark:text-gray-200"
            >
              MARGO TEAM
            </h4>
            <div className="mt-1 flex items-start gap-2">
              <LockIcon
                strokeWidth={1.5}
                className="mt-[0.1rem] h-3 w-3 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
              />
              <p className="text-xs text-gray-500">Private</p>
            </div>
          </div>
        </section>
        {/* NAVBAR LINKS */}
        <nav className="z-10 w-full" aria-label="Main Navigation">
          <ul role="main navigation links">
            <SidebarLink icon={Home} label="Home" href="/" />
            <SidebarLink icon={Briefcase} label="Timeline" href="/timeline" />
            <SidebarLink icon={Search} label="Search" href="/search" />
            <SidebarLink icon={Settings} label="Settings" href="/settings" />
            <SidebarLink icon={UserRound} label="Users" href="/users" />
            <SidebarLink icon={UsersRound} label="Teams" href="/teams" />
          </ul>
        </nav>
        {/* Projects Links */}
        <button
          onClick={() => setShowProjects((prev) => !prev)}
          className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
          aria-expanded={showProjects}
          aria-controls="projects-list"
        >
          <span>Projects</span>
          {showProjects ? (
            <ChevronUp
              strokeWidth={1.5}
              className="h-5 w-5"
              aria-hidden="true"
            />
          ) : (
            <ChevronDown
              strokeWidth={1.5}
              className="h-5 w-5"
              aria-hidden="true"
            />
          )}
        </button>
        {/* List Projects (Would go inside a <ul> if content existed) */}

        <AnimatePresence>
          {showProjects && (
            <motion.ul
              id="projects-list"
              role="list"
              {...animationList(showProjects)}
            >
              {projects?.map((project) => (
                <SidebarLink
                  key={project.id}
                  icon={Briefcase}
                  label={project.name}
                  href={`/projects/${project.id}`}
                />
              ))}
            </motion.ul>
          )}
        </AnimatePresence>

        {/* Priority Links */}
        <button
          onClick={() => setShowPriority((prev) => !prev)}
          className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
          aria-expanded={showPriority}
          aria-controls="priority-list"
        >
          <span>Priority</span>
          {showPriority ? (
            <ChevronUp
              strokeWidth={1.5}
              className="h-5 w-5"
              aria-hidden="true"
            />
          ) : (
            <ChevronDown
              strokeWidth={1.5}
              className="h-5 w-5"
              aria-hidden="true"
            />
          )}
        </button>
        <AnimatePresence>
          {showPriority && (
            <motion.ul
              id="priority-list"
              role="list"
              {...animationList(showPriority)}
            >
              <SidebarLink
                icon={AlertCircle}
                label="Urgent"
                href="/priority/urgent"
              />
              <SidebarLink
                icon={ShieldAlert}
                label="High"
                href="/priority/high"
              />
              <SidebarLink
                icon={AlertTriangle}
                label="Medium"
                href="/priority/medium"
              />
              <SidebarLink
                icon={AlertOctagon}
                label="Low"
                href="/priority/low"
              />
              <SidebarLink
                icon={Layers3}
                label="Backlog"
                href="/priority/backlog"
              />
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </aside>
  );
};
