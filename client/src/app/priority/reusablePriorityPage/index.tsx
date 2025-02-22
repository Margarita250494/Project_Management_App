"use client";

import { Header } from "@/app/(components)/header";
import { ModalNewTask } from "@/app/(components)/modalNewTask/ModalNewTask";
import { TaskCard } from "@/app/(components)/taskCard/TaskCard";
import { useAppSelector } from "@/app/redux";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";
import { useGetTasksByUserQuery } from "@/state/api";
import { Priority, Task } from "@/state/types";
import { DataGrid } from "@mui/x-data-grid";
import { motion } from "framer-motion";
import React, { useState } from "react";
import {columns} from "@/app/projects/tableView/tableColumns"
import ViewSwitch from "./ViewSwitchButton";




type Props = {
  priority: Priority;
};

const PrirorityPage = ({ priority }: Props) => {
    const [view, setView] = useState<"list" | "table">("list");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

  const userId = 1;
  const {
    data: tasks,
    isLoading,
    isError: isTaskError,
  } = useGetTasksByUserQuery(userId || 0, {
    skip: userId === null,
  });

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const filteredTasks = tasks?.filter(
    (task: Task) => task.priority == priority,
  );

  if (isTaskError)
    return (
      <motion.p
        className="mt-2 text-sm font-semibold text-red-600"
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -5 }}
        transition={{ duration: 0.3 }}
        whileHover={{
          x: [0, -3, 3, -3, 3, 0],
          transition: { duration: 0.4 },
        }}
      >
        ❌ Error fetching tasks
      </motion.p>
    );
  return (
    <div className="m-5 p-4">
      <ModalNewTask
        isOpen={isModalNewTaskOpen}
        onClose={() => setIsModalNewTaskOpen(false)}
      />
      <Header
        name="Priority Page"
        buttonComponent={
          <button
            className="mr-3 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            onClick={() => setIsModalNewTaskOpen(true)}
          >
            Add Task
          </button>
        }
      />
      <ViewSwitch view={view} setView={setView} />
      

      {isLoading ? (
        <motion.span
        className="text-sm font-semibold text-gray-500"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Loading...
      </motion.span>)
      : view === "list" ? (
        <div className="grid grid-cols-1 gap-4">
            {filteredTasks?.map((task:Task)=>(
                <TaskCard key={task.id} task={task}/>
            ))}
        </div>
      ) : (
        view === "table" && filteredTasks && (
            <div className="z-0 w-full">
                <DataGrid
                rows={filteredTasks}
                columns={columns}
                checkboxSelection
                getRowId={(row) => row.id}
                className={dataGridClassNames}
                sx={dataGridSxStyles(isDarkMode)}/>
            </div>
        )
      )}
    </div>
  );
};

export default PrirorityPage;

/**
 * 
 * 
 * <div className="mb-4 flex justify-start gap-x-3">
        <button
          className={`px-4 py-2 ${
            view === "list" ? "bg-gray-300" : "bg-white"
          } rounded`}
          onClick={() => setView("list")}
        >
          List
        </button>
        <button
          className={`px-4 py-2 ${
            view === "table" ? "bg-gray-300" : "bg-white"
          } rounded`}
          onClick={() => setView("table")}
        >
          Table
        </button>
      </div>
 */