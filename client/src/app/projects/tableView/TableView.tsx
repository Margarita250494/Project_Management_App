import { useGetTasksQuery } from '@/state/api';
import { motion } from 'framer-motion';
import React from 'react'
import { useAppSelector } from "@/app/redux";
import { Header } from '@/app/(components)/header';
import { DataGrid} from "@mui/x-data-grid";
import { dataGridClassNames, dataGridSxStyles } from '@/lib/utils';
import { columns } from './tableColumns';

type TableProps = {
    id: string;
    setIsModalNewTaskOpen: (isOpen: boolean) => void;
};


export const TableView = ({id,setIsModalNewTaskOpen}: TableProps) => {
    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
    const {
        data: tasks,
        error,
        isLoading,
      } = useGetTasksQuery({ projectId: Number(id) });
    
      if (isLoading)
        return (
          <motion.span
            className="text-sm font-semibold text-gray-500"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Loading...
          </motion.span>
        );
      if (error) return <div>An error occured while fetching tasks</div>;

  return (
    <div className="h-[33.75rem] w-full px-4 pb-8 xl:px-6">
        <div className="pt-5">
            <Header
            name='Table'
            isSmallText
            buttonComponent={
              <button
                className="flex items-center rounded bg-blue-primary px-3 py-2 text-white hover:bg-blue-600"
                onClick={() => setIsModalNewTaskOpen(true)}
              >
                Add Task
              </button>
            }
            />
        </div>
        <DataGrid
        rows={tasks || []}
        columns={columns}
        className={dataGridClassNames}
        sx={dataGridSxStyles(isDarkMode)}/>
    </div>
  )
}

