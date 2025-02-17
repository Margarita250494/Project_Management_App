import { Router } from "express";
import { getTasks,createTask, updateTasksStatus } from "../controllers/taskController";


const router = Router();

router.get("/",getTasks);
router.post("/", createTask);
router.patch("/:taskId/status",updateTasksStatus);

export default router;