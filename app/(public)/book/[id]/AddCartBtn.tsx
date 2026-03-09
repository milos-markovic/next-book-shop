'use client'

import { addToCart } from '@/action/Cart'
import { Button } from '@/components/ui/button'

type AddCartBtnProps = {
    bookId: string
}

const AddCartBtn = ({bookId}: AddCartBtnProps) => {

    const handleAddToCart = async (bookId: string) => {
        const status = await addToCart(bookId);

        console.log('status', status)
    }

    return (
        <Button onClick={() => handleAddToCart(bookId)} variant="default" className="w-full mt-5">
            Get in Cart
        </Button>
    )
}

export default AddCartBtn