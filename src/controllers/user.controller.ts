import { Request, Response } from "express";
import UserModel from "@/models/user.model";

// Get user profile
export const getProfile = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

// Update user profile
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { fullName, phone, avatar } = req.body;
    const updated = await UserModel.findByIdAndUpdate(
      req.user.id,
      { profile: { fullName, phone, avatar } },
      { new: true }
    ).select("-password");
    return res.json(updated);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

// Add address
export const addAddress = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const newAddress = req.body;

    if (newAddress.isDefault) {
      user.addresses.forEach((addr) => (addr.isDefault = false));
    }

    user.addresses.push(newAddress);
    await user.save();
    return res.status(201).json(user.addresses);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

// Update address
export const updateAddress = async (req: Request, res: Response) => {
  try {
    const { addressId } = req.params;
    const user = await UserModel.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const addressIndex = user.addresses.findIndex(
      (a: any) => a._id.toString() === addressId
    );
    if (addressIndex === -1) {
      return res.status(404).json({ message: "Address not found" });
    }

    if (req.body.isDefault) {
      user.addresses.forEach((addr) => (addr.isDefault = false));
    }

    user.addresses[addressIndex] = { ...user.addresses[addressIndex], ...req.body };
    await user.save();

    return res.json(user.addresses);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

// Delete address
export const deleteAddress = async (req: Request, res: Response) => {
  try {
    const { addressId } = req.params;
    const user = await UserModel.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.addresses = user.addresses.filter(
      (a: any) => a._id.toString() !== addressId
    );

    await user.save();
    return res.json(user.addresses);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};
