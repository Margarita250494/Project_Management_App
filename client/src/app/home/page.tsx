"use client";

import { useGetProjectsQuery, useGetTasksQuery } from "@/state/api";
import { useAppSelector } from "../redux";
import { Priority, Project} from "@/state/types";
import { LoadingError } from "../(components)/loadingError/LoadingError";
import { DataGrid } from "@mui/x-data-grid";
import { Header } from "../(components)/header";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Pie,
  Cell,
  PieChart,
} from "recharts";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";
import { PRIORITY_COLORS_LIGHT, PRIORITY_COLORS_DARK, COLORS, getChartColors  } from "./colors";
import { taskColumns } from "./taskColumns";


const HomePage = () => {
  const {
    data: tasks,
    isLoading: taskLoading,
    isError: tasksError,
  } = useGetTasksQuery({ projectId: parseInt("1") });

  const { data: projects, isLoading: isProjectsLoading } =
    useGetProjectsQuery();

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  <LoadingError
    isLoading={taskLoading || isProjectsLoading}
    isError={tasksError || !tasks || !projects}
    errorMessage="Error fetching data."
  />;

  const priorityColors = isDarkMode
    ? PRIORITY_COLORS_DARK
    : PRIORITY_COLORS_LIGHT;

  const statusCount = (projects ?? []).reduce(
    (acc: Record<string, number>, project: Project) => {
      const status = project.endDate ? "Completed" : "Active";
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    },
    {},
  );

  const bars = Object.keys(priorityColors).map((priority) => (
    <Bar
      key={priority}
      dataKey={`counts.${priority}`}
      fill={priorityColors[priority as Priority]}
      name={priority}
    />
  ));

  const taskDistribution = [
    tasks?.reduce(
      (acc, task) => {
        const priority = task.priority as Priority;
        acc.counts[priority] = (acc.counts[priority] || 0) + 1;
        return acc;
      },
      { name: "Tasks", counts: {} as Record<Priority, number> },
    ),
  ];

  const projectStatus = Object.keys(statusCount).map((key) => ({
    name: key,
    count: statusCount[key],
  }));

  const chartColors = getChartColors(isDarkMode);

  return (
    <div className="container h-full w-[100%] bg-gray-100 bg-transparent p-8">
      <Header name="Project Management Dashboard" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-lg bg-white p-4 shadow dark:bg-dark-secondary">
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Task Priority Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={taskDistribution}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={chartColors.barGrid}
                strokeWidth={1}
              />
              <XAxis dataKey="name" stroke={chartColors.text} />
              <YAxis stroke={chartColors.text} />
              <Tooltip
                contentStyle={{
                  width: "min-content",
                  height: "min-content",
                  backgroundColor: isDarkMode ? "#4B5563" : "#ffffff",
                }}
              />
              <Legend
                wrapperStyle={{
                  left: "25px",
                }}
              />
              {bars}
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-lg bg-white p-4 shadow dark:bg-dark-secondary">
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Project Status
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie dataKey="count" data={projectStatus} fill="#82ca9d" label>
                {projectStatus.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-lg bg-white p-4 shadow dark:bg-dark-secondary md:col-span-2">
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Your Tasks
          </h3>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={tasks}
              columns={taskColumns}
              checkboxSelection
              loading={taskLoading}
              getRowClassName={() => "data-grid-row"}
              getCellClassName={() => "data-grid-cell"}
              className={dataGridClassNames}
              sx={dataGridSxStyles(isDarkMode)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

//<Bar dataKey="count" fill={chartColors.bar}/>
/*const taskDistribution = Object.keys(priorityCount).map((key) => ({
    name:key,
    count:priorityCount[key],
  })); 
  
  const priorityCount = (tasks ?? []).reduce(
    (acc: Record<string, number>, task: Task) => {
      const { priority } = task;
      acc[priority as Priority] = (acc[priority as Priority] || 0) + 1;
      return acc;
    },
    {},
  );
  
  */