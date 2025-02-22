"use client";

import { useState } from "react";
import { Header } from "../(components)/header";
import { TabButton } from "./TabButton";
import { Clock, Filter, Grid3X3, List, PlusSquare, Share2, Table } from "lucide-react";
import { ModalNewProject } from "./modalNewProject/ModalNewProject";


type Props = {
  activeTab: string;
  setActiveTab: (tabName: string) => void;
};

export const ProjectHeader = ({ activeTab, setActiveTab }: Props) => {
  const [isModalNewProjectOpen, setIsModalNewProjectOpen] = useState(false);
  return (
    <div className="px-4 xl:px-6">
      {/**Modal new project */}
      <ModalNewProject isOpen={isModalNewProjectOpen} onClose={()=>setIsModalNewProjectOpen(false)}/>
      <div className="pb-6 pt-6 lg:pb-4 lg:pt-8">
        <Header 
          name="Product Design Development"
          buttonComponent={
            <button 
              className="flex items-center rounded-md bg-blue-primary px-3 py-2 text-white hover:bg-blue-600"
              onClick={()=>setIsModalNewProjectOpen(true)}>
                <PlusSquare strokeWidth={1.5} className="mr-2 h-5 w-5"/>
                New Boards
            </button>
          } />
      </div>
      {/**Tabs */}
      <div className="flex flex-wrap-reverse gap-2 border-y border-gray-200 pb-[0.5rem] pt-2 dark:border-stroke-dark md:items-center">
        <div className="flex flex-1 items-center gap-2 md:gap-4">
          <TabButton
            name="Board"
            icon={<Grid3X3 className="h-5 w-5" strokeWidth={1.5} />}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
          <TabButton
            name="List"
            icon={<List className="h-5 w-5" strokeWidth={1.5} />}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
          <TabButton
            name="Timeline"
            icon={<Clock className="h-5 w-5" strokeWidth={1.5} />}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
          <TabButton
            name="Table"
            icon={<Table className="h-5 w-5" strokeWidth={1.5} />}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="duration-200 text-gray-500 hover:text-gray-600 dark:text-neutral-500 dark:hover:text-gray-300">
            <Filter className="h-5 w-5" strokeWidth={1.5} />
          </button>
          <button className=" duration-200 text-gray-500 hover:text-gray-600 dark:text-neutral-500 dark:hover:text-gray-300">
            <Share2 className="h-5 w-5" strokeWidth={1.5} />
          </button>
          <div className="relative">
            <label htmlFor="search Task" className="sr-only"></label>
            <input
              id="search Task"
              type="text"
              placeholder="Search Task"
              className="rounded-md border py-1 pl-10 pr-4 focus:outline-none dark:border-dark-secondary dark:bg-dark-secondary dark:text-white"
            />
            <Grid3X3 className="absolute left-3 top-2 h-4 w-4 text-gray-400 dark:text-neutral-500" />
          </div>
        </div>
      </div>
    </div>
  );
};
