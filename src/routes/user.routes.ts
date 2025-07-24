import express from "express";
import {
  getProfile,
  updateProfile,
  addAddress,
  updateAddress,
  deleteAddress,
} from "@/controllers/user.controller";
import { authenticate } from "@/middlewares/auth.middleware";

const router = express.Router();

router.get("/profile", authenticate, getProfile);
router.put("/profile", authenticate, updateProfile);

router.post("/address", authenticate, addAddress);
router.put("/address/:addressId", authenticate, updateAddress);
router.delete("/address/:addressId", authenticate, deleteAddress);

export default router;
