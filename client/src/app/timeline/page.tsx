"use client";

import { useAppSelector } from "@/app/redux";
import { useGetProjectsQuery} from "@/state/api";
import { useMemo, useState } from "react";
import { DisplayOption, Gantt, ViewMode } from "gantt-task-react"
import "gantt-task-react/dist/index.css"
import { Header } from "../(components)/header";
import { LoadingError } from "../(components)/loadingError/LoadingError";


type TaskTypeItems = "task" | "milestone" | "project";

const Timeline = () => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const {data:projects, isLoading, isError} = useGetProjectsQuery();

  const [displayOptions, setDisplayOptions] = useState<DisplayOption>({
    viewMode: ViewMode.Month,
    locale:"en-US"
  });
  const ganntTasks = useMemo(() => {
    return(
        projects?.map((project) => ({
            start: new Date(project.startDate as string),
            end: new Date(project.endDate as string),
            name:project.name,
            id: `Project-${project.id}`,
            type:"project" as TaskTypeItems,
            progress:50,
            isDisabled:false
        })) || []
    )
  }, [projects]);

  <LoadingError isLoading={isLoading} isError={isError || !projects} errorMessage="An error occured while fetching projects"/>

  const handleViewModeChange = (
    event:React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDisplayOptions((prev) => ({
        ...prev,
        viewMode:event.target.value as ViewMode
    }))
  }
  return (
    <section aria-labelledby="Projects-Timeline" className="max-w-full p-8">
        <header className="mb-4 flex items-center justify-between">
            <Header name="Projects Timeline"/>
            <div className="relative inline-block w-64">
                <label className="sr-only" htmlFor="period-of-time-select">Choose a period of time</label>
                <select 
                    name="period-of-time" 
                    id="period-of-time-select" 
                    className="focus:shadow-outline block w-full appearance-none rounded border border-gray-400 bg-white px-4 py-2 pr-8 leading-tight shadow hover:border-gray-500 focus:outline-none dark:border-dark-secondary dark:bg-dark-secondary dark:text-white"
                    value={displayOptions.viewMode}
                    onChange={handleViewModeChange}>
                    <option value={ViewMode.Day}>Day</option>
                    <option value={ViewMode.Week}>Week</option>
                    <option value={ViewMode.Month}>Month</option>
                </select>
            </div>
        </header>

        <div className="overflow-hidden rounded-md bg-white shadow dark:bg-dark-secondary dark:text-white">
            <div className="timeline">
                <Gantt 
                    tasks={ganntTasks}
                    {...displayOptions}
                    columnWidth={displayOptions.viewMode===ViewMode.Month ? 150 :100}
                    listCellWidth="100px"
                    projectBackgroundColor={isDarkMode ? "#101214" : "#1f2937"}
                    projectProgressColor={isDarkMode ? "#1f2937" : "#aeb8c2"}
                    projectProgressSelectedColor={isDarkMode ? "#000" : "#9ba1a6"}
                />
            </div>
        </div>
    </section>);
};

export default Timeline;
