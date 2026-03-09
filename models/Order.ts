// models/Order.ts
import mongoose from "mongoose";
import { cartType } from "./Cart";
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    cart: { type: Schema.Types.ObjectId, ref: "Cart" },

    customer: {
      name: String,
      email: String,
      address: String,
      phone: String,
    },

    paymentMethod: {
      type: String,
      enum: ["card", "cash", "paypal"],
    },

    total: Number,

    status: {
      type: String,
      enum: ["pending", "paid", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export type OrderType = {
  _id: mongoose.Types.ObjectId,
  cart: cartType,
  customer: {
    name: string,
    email: string,
    address: string,
    phone: string
  },
  paymentMethod: string,
  total: number,
  status: string
}

export const Order =
  mongoose.models.Order || mongoose.model("Order", orderSchema);
