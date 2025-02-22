import { statusColors } from "./colors";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Task as TaskType } from "@/state/types";
import { PriorityTag } from "../(components)/priotity/PriorityTag";


export const taskColumns: GridColDef[] = [
  { field: "title", headerName: "Title", width: 200 },
  {
    field: "status",
    headerName: "Status",
    width: 150,
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
  { field: "priority", headerName: "Priority", width: 150, 
    renderCell: (params: GridRenderCellParams) => (
                <PriorityTag priority={params.value as TaskType["priority"]} />
              ), },
  { field: "dueDate", headerName: "Due Date", width: 150 },
];