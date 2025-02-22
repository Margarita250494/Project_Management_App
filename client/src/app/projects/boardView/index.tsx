"use client";

import { useGetTasksQuery, useUpdateTaskStatusMutation } from "@/state/api";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend"
import { TaskColumn } from "./TaskColumn";
import { motion } from "framer-motion";


type BoardProps = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const taskStatus = ["To Do", "Work In Progress", "Under Review", "Completed"];

export const BoardView = ({ id, setIsModalNewTaskOpen }: BoardProps) => {
  const {
    data: tasks,
    isLoading,
    error,
  } = useGetTasksQuery({ projectId: Number(id) });

  const [updateTaskStatus] = useUpdateTaskStatusMutation();

  const moveTask = (taskId: number, toStatus: string) => {
    updateTaskStatus({ taskId, status: toStatus });
  };
  if (isLoading) return <motion.span 
  className="text-sm font-semibold text-gray-500"
  animate={{ opacity: [0.3, 1, 0.3] }}
  transition={{ duration: 1.5, repeat: Infinity }}>Loading...</motion.span>;
  if (error) return <div>An error occured while fetching tasks</div>;

  return (
    <DndProvider backend={HTML5Backend}>
        <section aria-labelledby="tasks-view" className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 xl:grid-cols-4">
            <h2 className="sr-only" id="tasks-view">Tasks View</h2>
            {taskStatus.map((status)=>(
                <TaskColumn 
                    key={status} 
                    status={status} 
                    tasks={tasks || []} 
                    moveTask={moveTask}
                    setIsModalNewTaskOpen={setIsModalNewTaskOpen}
                />
            ))}
        </section>
    </DndProvider>
    );
};
