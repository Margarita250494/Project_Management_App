import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import { Task as TaskType } from "@/state/types";
import { PriorityTag } from "@/app/(components)/priotity/PriorityTag";

const statusColors: Record<string, string> = {
    "To Do": "bg-blue-100 text-gray-800", 
    "Work In Progress": "bg-yellow-100 text-gray-700",
    "Work in Progress": "bg-yellow-100 text-gray-700", 
    "Under Review": "bg-orange-100 text-gray-700", 
    "Completed": "bg-green-100 text-gray-700", 
};



export const columns:GridColDef[] = [
    {
        field:"title",
        headerName:"Title",
        width:100,
    },
    {
        field: "description",
        headerName: "Description",
        width: 200,
    },
    {
        field: "status",
        headerName: "Status",
        width: 130,
        renderCell: (params: GridRenderCellParams) => {
            const statusClass = statusColors[params.value as string] || ""; // Default color
            return (
              <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${statusClass}`}>
                {params.value}
              </span>
            );
          },
    },
    {
        field: "priority",
        headerName: "Priority",
        width: 75,
        renderCell: (params: GridRenderCellParams) => (
            <PriorityTag priority={params.value as TaskType["priority"]} />
          ),
      },
      {
        field: "tags",
        headerName: "Tags",
        width: 130,
      },
      {
        field: "startDate",
        headerName: "Start Date",
        width: 130,
      },
      {
        field: "dueDate",
        headerName: "Due Date",
        width: 130,
      },
      {
        field: "author",
        headerName: "Author",
        width: 150,
        renderCell: (params) => params.value?.author || "Unknown",
      },
      {
        field: "assignee",
        headerName: "Assignee",
        width: 150,
        renderCell: (params) => params.value?.assignee || "Unassigned",
      },
]