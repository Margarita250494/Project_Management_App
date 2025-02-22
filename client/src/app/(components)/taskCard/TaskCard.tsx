import { Task } from "@/state/types";
import { format } from "date-fns";
import Image from "next/image";
import { PriorityTag } from "../priotity/PriorityTag";
import { statusColors } from "@/app/projects/tableView/tableColumns";

type Props = {
  task: Task;
};

export const TaskCard = ({ task }: Props) => {
  
  return (
    <div className="mb-3 flex flex-col gap-3 rounded bg-white p-4 shadow dark:bg-dark-secondary dark:text-white">
      {task.attachments && task.attachments.length > 0 && (
        <div className="flex flex-col gap-2">
          <strong>Attachments:</strong>
          <div className="flex flex-wrap">
            {task.attachments && task.attachments.length > 0 && (
              <Image
                src={`/${task.attachments[0].fileURL}`}
                alt={task.attachments[0].fileName}
                width={400}
                height={200}
                className="rounded-md"
              />
            )}
          </div>
        </div>
      )}
      <p className="mb-0">
        <strong>ID:</strong> {task.id}
      </p>
      <p className="mb-0">
        <strong>Title:</strong> {task.title}
      </p>
      <p className="mb-0">
        <strong>Description:</strong>{" "}
        {task.description || "No description provided"}
      </p>
      <p className="mb-0 items-center gap-2">
        <strong>Status:</strong>{" "}
        {task.status && (
          <span
          className={`rounded-full px-2 py-1 font-semibold text-sm ${statusColors[task.status] || "bg-gray-100 text-gray-700"}`}
        >
          {task.status}
        </span>
        )}
      </p>
      <p className="mb-0 flex items-center gap-2">
        <strong>Priority:</strong>
        {task.priority && <PriorityTag priority={task.priority} />}
      </p>
      <p className="mb-0 flex items-center gap-2">
        <strong>Tags:</strong>
        {task.tags ? (
          task.tags.split(",").map((tag, index) => (
            <span
              key={index}
              className="rounded-full font-semibold bg-blue-100 px-2 py-1 text-sm dark:text-gray-700"
            >
              {tag.trim()}
            </span>
          ))
        ) : (
          <span className="rounded-full font-semibold bg-gray-200 px-2 py-1 text-sm dark:text-gray-700">
            No tags
          </span>
        )}
      </p>
      <p className="mb-0">
        <strong>Start Date:</strong>{" "}
        {task.startDate ? format(new Date(task.startDate), "P") : "Not set"}
      </p>
      <p className="mb-0">
        <strong>Due Date:</strong>{" "}
        {task.dueDate ? format(new Date(task.dueDate), "P") : "Not set"}
      </p>
      <p className="mb-0">
        <strong>Author:</strong>{" "}
        {task.author ? task.author.username : "Unknown"}
      </p>
      <p className="mb-0">
        <strong>Assignee:</strong>{" "}
        {task.assignee ? task.assignee.username : "Unassigned"}
      </p>
    </div>
  );
};
