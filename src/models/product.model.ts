import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    stock: number;
}

const productSchema = new Schema<IProduct>(
    {
        name: {
            type: String,
            required: true,
        },
        description: String,
        price: {
            type: Number,
            required: true,
        },
        stock: {
            type: Number,
            default: 0,
        }
    },
    {
        timestamps: true,
    }
)

const ProductModel = mongoose.model<IProduct>("Product", productSchema);

export default ProductModel;