import React from 'react'
import CartItem from './CartItem';
import { CartItemType } from '@/models/Cart';

type CartMain = {
    items: CartItemType[],
    sumPrice: number
}

const CartItems = ({items, sumPrice}: CartMain) => {
  return (
    <div className="space-y-4">
        {items.map((item, index) => {
            const {book} = item;
            const orderNumber = index + 1;

            return (
                <div key={index}>
                    <CartItem 
                        orderNumber={orderNumber} 
                        title={book.title} 
                        author={book.author} 
                        img={book.img} 
                        price={book.price}
                        itemNumber={index}
                        quantity={item.quantity}
                        />
                </div>
            )
        })}

        <h3 className="text-red-500 text-lg font-semibold text-right mt-10 mr-40">Ukupno: {sumPrice} din</h3>
    </div>
  )
}

export default CartItems