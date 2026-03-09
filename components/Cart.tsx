import { Cart as CartModel } from '@/models/Cart'
import connectDb from '@/db/connectDB'
import { ShoppingCart } from 'lucide-react'
import React from 'react'
import Link from 'next/link'

const Cart = async () => {
  await connectDb();
  const activeCart = await CartModel.findOne({status: 'active'}).lean();
  const cartItems = activeCart?.items.length;

  return (
    <div className="relative">
        <Link href="/cart">
          {cartItems && <span className="bg-secondary-foreground w-4 h-4 aspect-square rounded-full absolute -top-2 -right-2 flex items-center justify-center">{cartItems}</span>}
          <ShoppingCart />
        </Link>
    </div>
  )
}

export default Cart