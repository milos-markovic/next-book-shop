'use client'

import { deleteCartItem } from '@/action/Cart';
import { Button } from '@/components/ui/button';
import Image from 'next/image'
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

type CartItemProps = {
    orderNumber: number,
    title: string,
    author: string,
    img: string,
    price: number,
    quantity: number
    itemNumber: number,
}

const CartItem = ({orderNumber, title, author, img, price, quantity, itemNumber}: CartItemProps) => {
  const router = useRouter();

  const handleDeleteCartItem = async () => {
    const status = await deleteCartItem(itemNumber);

    if(status){
        toast('Item cart is deleted');
        router.push('/cart')
    }
  }

  return (
    <div className="flex items-center gap-6">
        <div>{orderNumber}</div>
        <div>
            <Image priority src={img} alt={title} width={40} height={80} />
        </div>
        <div className="flex-1">
            <h3 className="text-lg text-gray-500">{title}</h3>
            <p className="text-sm">{author}</p>
        </div>
        <div>Cena: {price}</div>
        <div>{quantity} kom</div>
        <div>Ukupno: <span className='text-red-500'>{quantity * price} din</span></div>
        <div>
            <Button onClick={handleDeleteCartItem} variant="outline">
                Delete
            </Button>
        </div>
    </div>
  )
}

export default CartItem