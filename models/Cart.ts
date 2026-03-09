import mongoose from "mongoose";
import "./Book"; 
import { BookType } from "./Book";
const { Schema } = mongoose;

const cartItemSchema = new Schema({
  book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
  quantity: { type: Number, default: 1 },
});

const cartSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", default: null },
    items: [cartItemSchema],
    customer: {
      name: String,
      email: String,
      address: String,
      phone: String,
    },
    payment: {
      method: {
        type: String,
        enum: ["card", "cash", "paypal"],
      },
    },
    status: {
      type: String,
      enum: ["active", "ordered"],
      default: "active",
    },
  },
  { timestamps: true }
);

export type CartItemType = {
    book: BookType
    quantity: number,
    _id: mongoose.Types.ObjectId,
}

export type cartType = {
    _id: mongoose.Types.ObjectId,
    user: mongoose.Types.ObjectId,
    items: CartItemType[],
    customer: {
      name: string,
      email: string,
      address: string,
      phone: string,
    },
    payment: {
      method: string
    },
    status: string,
    createdAt: Date;
    updatedAt: Date;
}

export const Cart = mongoose.models.Cart || mongoose.model("Cart", cartSchema);
