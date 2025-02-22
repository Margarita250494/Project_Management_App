"use client"

import { use, useState } from "react";
import { ProjectHeader } from "../ProjectHeader";
import { BoardView } from "../boardView";
import { ListView } from "../listView";
import { TimelineView } from "../timelineView/TimelineView";
import { TableView } from "../tableView/TableView";
import { ModalNewTask } from "@/app/(components)/modalNewTask/ModalNewTask";


type Props = {
  params: Promise<{ id: string }>; 
};

const Project = ({params}:Props) => {
    const { id } = use(params);
    const [activeTab, setActiveTab] = useState("Board");
    const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);
  return (
    <div>
    {/*MODAL NEW TASK */}
    <ModalNewTask isOpen={isModalNewTaskOpen} onClose={()=>setIsModalNewTaskOpen(false)} id={id}/>

    <ProjectHeader activeTab = {activeTab} setActiveTab = {setActiveTab}/>
    {activeTab === "Board" && (
        <BoardView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen}/>
    )}
    {activeTab === "List" && (
        <ListView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen}/>
    )}
    {activeTab === "Timeline" && (
        <TimelineView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen}/>
    )}
    {activeTab === "Table" && (
        <TableView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen}/>
    )}
    </div>
  )
}
export default Project

