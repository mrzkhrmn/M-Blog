import express from "express";
import {
  deleteUser,
  signout,
  updateUser,
} from "../controllers/userController.js";
import { authenticate } from "../utils/authenticate.js";

const router = express.Router();

router.put("/update/:userId", authenticate, updateUser);
router.delete("/delete/:userId", authenticate, deleteUser);
router.post("/signout", authenticate, signout);

export default router;
