import { Project } from "@/state/types";
import React from "react";

type Props = {
  project: Project;
};

export const ProjectCard = ({ project }: Props) => {
  return (
    <div className="rounded border p-4 shadow flex flex-col gap-2 bg-white dark:bg-dark-secondary dark:text-white">
      <h3 className="font-bold text-blue-700 dark:text-blue-300">{project.name}</h3>
      <p className="mb-0 text-wrap max-w-[16rem]">{project.description}</p>
      <time className="mb-0"> <span className="font-semibold">Start Date:</span> {project.startDate}</time>
      <time className="mb-0"> <span className="font-semibold">End Date:</span> {project.endDate}</time>
    </div>
  );
};

