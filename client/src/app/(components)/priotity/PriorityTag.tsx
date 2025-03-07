import { Task as TaskType } from "@/state/types";


export const PriorityTag = ({ priority }: { priority: TaskType["priority"] }) => (
    <span
      className={`rounded-full px-2 py-1 text-xs font-semibold ${
        priority === "Urgent"
          ? "bg-red-200 text-red-700"
          : priority === "High"
            ? "bg-yellow-200 text-yellow-700"
            : priority === "Medium"
              ? "bg-green-200 text-green-700"
              : priority === "Backlog"
                ? "bg-blue-200 text-blue-700"
                : priority === "Low"
                ? "bg-gray-300 text-gray-700"
                : "bg-gray-200 text-gray-700"
      }`}
    >
      {priority}
    </span>
  );