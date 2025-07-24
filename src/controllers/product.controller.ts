import { Request, Response } from "express"
import ProductModel from "@/models/product.model"


export const createProduct = async (req: Request, res: Response) => {
    const product = ProductModel.create(req.body);
    res.status(200).json({
        message: "Product Created",
        product
    })
}

export const getAllProducts = async (_req: Request, res: Response) => {
  const products = await ProductModel.find();
  res.status(200).json({ products });
};

export const getProductById = async (req: Request, res: Response) => {
  const product = await ProductModel.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Not found" });
  res.status(200).json({ product });
};

export const updateProduct = async (req: Request, res: Response) => {
  const product = await ProductModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!product) return res.status(404).json({ message: "Not found" });
  res.status(200).json({ product });
};

export const deleteProduct = async (req: Request, res: Response) => {
  const product = await ProductModel.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).json({ message: "Not found" });
  res.status(200).json({ message: "Deleted" });
};