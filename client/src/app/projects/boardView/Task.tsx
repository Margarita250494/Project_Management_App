import { PriorityTag } from "@/app/(components)/priotity/PriorityTag";
import { Task as TaskType } from "@/state/types";
import { format } from "date-fns";
import { EllipsisVertical, MessageSquareMore } from "lucide-react";
import Image from "next/image";
import { DragSourceMonitor, useDrag } from "react-dnd";


type TaskProps = {
  task: TaskType;
};

export const Task = ({ task }: TaskProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  const taskTagsSplit = task.tags ? task.tags.split(",") : [];

  const formattedStartDate = task.startDate
    ? format(new Date(task.startDate), "P")
    : "";

  const formattedDueDate = task.dueDate
    ? format(new Date(task.dueDate), "P")
    : "";

  const numberOfComments = (task.comments && task.comments.length) || 0;

  
  {/**main card task */}
  return (
    
    <div
      ref={(instance) => {
        drag(instance);
      }}
      className={`mb-4 rounded-md bg-white shadow dark:bg-dark-secondary ${isDragging ? "opacity-50" : "opacity-100"}`}
      aria-labelledby={`task-${task.id}`}
    >
        {/**id we have a img => */}
      {task.attachments && task.attachments.length > 0 && (
        <Image
          src={`/${task.attachments[0].fileURL}`}
          alt={task.attachments[0].fileName}
          width={40}
          height={200}
          className="h-auto w-full rounded-t-md"
        />
      )}
      {/**card task info */}
      <div className="p-4 md:p-6">
        <div className="flex items-start justify-between">
          <div className="flex flex-1 flex-wrap items-center gap-2">
            {task.priority && <PriorityTag priority={task.priority} />}
            <div className="flex gap-2">
              {taskTagsSplit.map((tag) => (
                <div
                  key={tag}
                  className="rounded-full bg-blue-100 px-2 py-1 text-xs"
                >
                  {" "}
                  {tag}
                </div>
              ))}
            </div>
          </div>
          <button className="flex h-6 w-4 flex-shrink-0 items-center justify-center dark:text-neutral-500" aria-label="More options">
            <EllipsisVertical strokeWidth={1.5} size={26}/>
          </button>
        </div>

        <div className="my-3 flex justify-between">
            <h4 className="text-md font-bold dark:text-white">{task.title}</h4>
            {typeof task.points === "number" && (
                <span className="text-xs font-semibold dark:text-white" aria-label={`${task.points} points`}>
                    {task.points} pts
                </span>
            )}
        </div>

        <time className="text-xs text-gray-500 dark:text-neutral-500">
            {formattedStartDate && <span>{formattedStartDate} - </span>}
            {formattedDueDate && <span>{formattedDueDate}</span>}
        </time>

        <p className="text-sm text-gray-600 dark:text-neutral-500">
            {task.description}
        </p>

        <hr className="mt-4 border-t border-gray-200 dark:border-stroke-dark"/>

        {/**USERS */}
        <div className="mt-3 flex items-center justify-between">
            <div className="flex -space-x-[0.375rem] overflow-hidden">
                {task.assignee && (
                    <Image 
                    key={task.assignee.userId}
                    src={`/${task.assignee.profilePictureUrl!}`} 
                    alt={task.assignee.username}
                    width={30}
                    height={30}
                    className="h-8 w-8 rounded-full border-2 border-white object-cover dark:border-dark-secondary"
                    />
                )}
                {task.author && (
                    <Image 
                    key={task.author.userId}
                    src={`/${task.author.profilePictureUrl!}`} 
                    alt={task.author.username}
                    width={30}
                    height={30}
                    className="h-8 w-8 rounded-full border-2 border-white object-cover dark:border-dark-secondary"
                    />
                )}
            </div>

            <div className="flex items-center text-gray-500 dark:text-neutral-500">
                <MessageSquareMore strokeWidth={1.5} size={20}/>
                <span className="ml-1 text-sm dark:text-neutral-400">
                    {numberOfComments}
                </span>
            </div>
        </div>
      </div>
    </div>
  );
};
