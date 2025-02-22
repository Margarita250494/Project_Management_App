import { Priority} from "@/state/types";


export const PRIORITY_COLORS_LIGHT: Record<Priority, string> = {
  Urgent: "#EF4444", // Red
  High: "#EAB308", // Orange
  Medium: "#3b82f6", // Blue
  Low: "#6b7280", // Gray
  Backlog: "#78716C", // Dark Gray
};
export const PRIORITY_COLORS_DARK: Record<Priority, string> = {
  Urgent: "#FECACA", // Light Red
  High: "#FEF08A", // Light Yellow
  Medium: "#BBF7D0", // Light Green
  Low: "#e5e7eb", // Light Gray
  Backlog: "#E7E5E4", // Light Blue
};

export const statusColors: Record<string, string> = {
  "To Do": "bg-blue-100 text-gray-800",
  "Work In Progress": "bg-yellow-100 text-gray-700",
  "Work in Progress": "bg-yellow-100 text-gray-700",
  "Under Review": "bg-orange-100 text-gray-700",
  Completed: "bg-green-100 text-gray-700",
};

export const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export const getChartColors = (isDarkMode: boolean) => ({
    bar: "#8884d8",
    barGrid: isDarkMode ? "#303030" : "#E0E0E0",
    pieFill: isDarkMode ? "#4A90E2" : "#82ca9d",
    text: isDarkMode ? "#FFFFFF" : "#000000",
  });
