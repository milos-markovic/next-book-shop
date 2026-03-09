'use server'

import connectDb from "@/db/connectDB";
import { Cart, cartType } from "@/models/Cart";
import { Order } from "@/models/Order";
import { revalidatePath } from "next/cache";

export const orderBook = async (cartId: string) => {
    await connectDb();

    const cart: cartType | null = await Cart.findOne({_id: cartId}).populate('items.book');

    if(!cart){
        return {success: false};
    }

    let total = 0;

    cart?.items?.map(item => total += item.book.price);

    const order = new Order();
    order.cart = cart?._id;
    order.customer = cart?.customer;
    order.paymentMethod = cart?.payment.method;
    order.total = total;
    order.status = "paid";

    await order.save();

    await Cart.findByIdAndUpdate({_id: cartId}, {status: 'ordered'})

    revalidatePath('/cart')

    return {success: true}
}

export const deleteOrder = async (orderId: string) => {
  const order = await Order.findById(orderId);

  if(!order){
    return {success: false}
  }

  await Cart.findByIdAndDelete(order.cart);
  await Order.findByIdAndDelete(orderId);

  revalidatePath('/admin/orders');

  return {success: true};
}