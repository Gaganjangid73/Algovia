import { Router } from "express";
import { CurriculumController } from "../controllers/curriculum.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { requireAdmin } from "../middlewares/adminAuth.middleware.js";

const router = Router();

// Public / Student Routes
router.get("/", CurriculumController.getAllTopics);
router.get("/:slug", CurriculumController.getTopicBySlug);

// Admin Curriculum Authoring & Management Routes
router.post("/admin/topics", authenticateToken, requireAdmin, CurriculumController.createTopic);
router.put("/admin/topics/:id", authenticateToken, requireAdmin, CurriculumController.updateTopic);
router.patch("/admin/topics/:id/visibility", authenticateToken, requireAdmin, CurriculumController.toggleVisibility);
router.delete("/admin/topics/:id", authenticateToken, requireAdmin, CurriculumController.deleteTopic);

export default router;
