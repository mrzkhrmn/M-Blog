import express from "express";
import { updateUser } from "../controllers/userController.js";
import { authenticate } from "../utils/authenticate.js";

const router = express.Router();

router.put("/update/:userId", authenticate, updateUser);

export default router;
