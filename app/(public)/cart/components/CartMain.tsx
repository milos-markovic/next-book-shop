'use client'

import { Button } from '@/components/ui/button';
import { CartItemType } from '@/models/Cart';
import Link from 'next/link';
import CartItems from './CartItems';


type CartMain = {
    items: CartItemType[],
    sumPrice: number
}


const CartMain = ({items, sumPrice}: CartMain) => {
  return (
    <main className="flex-1">
        <CartItems items={items} sumPrice={sumPrice}  />

        <Button variant="ghost" size="lg" className="flex w-xs mx-auto mt-10 text-red-500" asChild>
            <Link href="/cart/user-data">
                DALJE
            </Link>
        </Button>
    </main>
  )
}

export default CartMain