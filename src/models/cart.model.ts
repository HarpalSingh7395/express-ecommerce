import mongoose, { Document, Schema } from "mongoose";

export interface CartItem {
    product: mongoose.Schema.Types.ObjectId;
    quantity: number;
}

export interface ICart extends Document {
    user: mongoose.Schema.Types.ObjectId;
    items: CartItem[]
}

const cartSchema = new Schema<ICart>(
    {
        user: {
            type: Schema.Types.ObjectId, ref: "User", unique: true,
        },
        items: [
            {
                product: {
                    type: Schema.Types.ObjectId, ref: "Product",
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1
                }
            }
        ]
    },
    { timestamps: true }
)

const CartModel = mongoose.model<ICart>("Cart", cartSchema)

export default CartModel;