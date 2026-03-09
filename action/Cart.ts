"use server";

import { Cart, CartItemType, cartType } from "@/models/Cart";
import { Book } from "@/models/Book";
import { revalidatePath } from "next/cache";
import { formActionState, paymentMethodDataSchema, userDataSchema } from "@/lib/validate";
import connectDb from "@/db/connectDB";

export const getCarts = async (): Promise<cartType[]> => {
  const carts = await Cart.find({}).populate('items.book').lean();

  return carts;
}

export const getCart = async () => {
    const cartData = await Cart.findOne({status: 'active'}).populate('items.book').lean();

    const cart = cartData ? {...cartData, _id: cartData._id.toString()} : null

    let sumPrice = 0;

    if(cart){
      cart.items = cart.items ? cart.items.map((item: CartItemType) => {
          return {...item, book: {...item.book, _id: item.book._id.toString(), category: item.book.category.toString()}, _id: item._id.toString() }
      }) : [];

      
      cart.items.map((item: CartItemType) => sumPrice += item.quantity * item.book.price)
    }

    return {
      cart,
      sumPrice
    }  
}

export async function addToCart(bookId: string) {
  const book = await Book.findById(bookId).lean();
  if (!book) throw new Error("Book not found");

  let cart = await Cart.findOne({ status: "active" });

  if (!cart) {
    cart = await Cart.create({
      items: [],
    });
  }

  const existingItem = cart.items.find(
    (i: CartItemType) => i.book.toString() === bookId
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.items.push({
      book: book._id,
      quantity: 1,
      priceAtTime: book.price,
    });
  }

  await cart.save();

  revalidatePath(`/book/${bookId}`)

  return { success: true };
}

export const deleteCartItem = async (itemNum: number) => {
  const cart = await Cart.findOne({ status: "active" });

  const deleteCartItem = cart.items.filter((item: object, index: number) => index !== itemNum);

  cart.items = deleteCartItem;
  await cart.save();

  if(!cart.items.length){
   await Cart.findOne({ status: "active" }).deleteOne();
  }

  revalidatePath(`/cart`)

  return { success: true };
}

export const insertUserData = async (initialState: formActionState, formData: FormData) => {
  const name = formData.get('name');
  const email = formData.get('email');
  const address = formData.get('address');
  const phone = formData.get('phone');

  const userDataParsed = userDataSchema.safeParse({
      name,
      email,         
      address,
      phone
  });

  if (!userDataParsed.success) {
      console.log("Validation errors:", userDataParsed.error.flatten().fieldErrors);
      return {
          success: false,
          errors: userDataParsed.error.flatten().fieldErrors
      };
  }

  await connectDb();

  const cart = await Cart.findOne({status: 'active'});
  cart.customer = userDataParsed.data;

  await cart.save();

  revalidatePath('/cart/user-data');

  return {success: true}
}

export const insertPaymentType = async (initialState: formActionState, formData: FormData) => {
  const paymentMethod = formData.get('paymentMethod');

  const paymentDataParsed = paymentMethodDataSchema.safeParse({
      paymentMethod,
  });

  if (!paymentDataParsed.success) {
      console.log("Validation errors:", paymentDataParsed.error.flatten().fieldErrors);
      return {
          success: false,
          errors: paymentDataParsed.error.flatten().fieldErrors
      };
  }

  await connectDb();  

  const cart = await Cart.findOne({status: 'active'});
  cart.payment.method = paymentDataParsed.data.paymentMethod;

  await cart.save();

  revalidatePath('/cart/payment-type');

  return {success: true}
}

export const deleteCart = async (cartId: string) => {
  const cart = await Cart.findById(cartId);

  if(!cart){
    return {success: false}
  }

  await Cart.findByIdAndDelete(cartId);

  revalidatePath('/admin/cart');

  return {success: true};
}
