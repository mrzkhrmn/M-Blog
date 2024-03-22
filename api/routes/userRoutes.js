import express from "express";
import { deleteUser, updateUser } from "../controllers/userController.js";
import { authenticate } from "../utils/authenticate.js";

const router = express.Router();

router.put("/update/:userId", authenticate, updateUser);
router.delete("/delete/:userId", authenticate, deleteUser);

export default router;
