import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { format } from "date-fns";

import { Task as TaskType } from "@/state/types";
import { PriorityTag } from "@/app/(components)/priotity/PriorityTag";

export const statusColors: Record<string, string> = {
  "To Do": "bg-blue-100 text-gray-800",
  "Work In Progress": "bg-yellow-100 text-gray-700",
  "Work in Progress": "bg-yellow-100 text-gray-700",
  "Under Review": "bg-orange-100 text-gray-700",
  Completed: "bg-green-100 text-gray-700",
};

export const columns: GridColDef[] = [
  {
    field: "title",
    headerName: "Title",
    width: 80,
  },
  {
    field: "description",
    headerName: "Description",
    width: 200,
  },
  {
    field: "status",
    headerName: "Status",
    width: 140,
    renderCell: (params: GridRenderCellParams) => {
      const statusClass = statusColors[params.value as string] || ""; // Default color
      return (
        <span
          className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${statusClass}`}
        >
          {params.value}
        </span>
      );
    },
  },
  {
    field: "priority",
    headerName: "Priority",
    width: 90,
    renderCell: (params: GridRenderCellParams) => (
      <PriorityTag priority={params.value as TaskType["priority"]} />
    ),
  },
  {
    field: "tags",
    headerName: "Tags",
    width: 200,
    
    renderCell: (params: GridRenderCellParams) => {
      const tags = params.value as string | undefined;
      if (tags) {
        return (
          <p className="inline-flex rounded-full px-1 text-xs font-semibold gap-2 ">
            {tags.split(",").map((tag, index) => (
              <span
                key={index}
                className="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold dark:text-gray-700"
              >
                {tag.trim()}
              </span>
            ))}
          </p>
        );
      }
    },
  },
  {
    field: "startDate",
    headerName: "Start Date",
    width: 110,
    renderCell: (params: GridRenderCellParams) => {
      return params.value ? format(new Date(params.value), "dd/MM/yyyy") : "N/A";
    },
  },
  {
    field: "dueDate",
    headerName: "Due Date",
    width: 110,
    renderCell: (params: GridRenderCellParams) => {
      return params.value ? format(new Date(params.value), "dd/MM/yyyy") : "N/A";
    },
  },
  {
    field: "author",
    headerName: "Author",
    width: 150,
    renderCell: (params) => params.value.username || "Unknown",
  },
  {
    field: "assignee",
    headerName: "Assignee",
    width: 150,
    renderCell: (params) => params.value.username || "Unassigned",
  },
];
