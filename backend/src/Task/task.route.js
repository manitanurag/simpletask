import express from "express";
import TaskController from "./task.controller.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();
const controller = new TaskController();

router.post("/create", verifyToken, (req, res) => controller.create(req, res));
router.get("/list", verifyToken, (req, res) => controller.list(req, res));
router.get("/:id", verifyToken, (req, res) => controller.details(req, res));
router.put("/:id", verifyToken, (req, res) => controller.edit(req, res));
router.delete("/:id", verifyToken, (req, res) => controller.delete(req, res));

export default router;
