'use client'

import { orderBook } from '@/action/Order';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

type ButtonOrderProps = {
    cartId: string
}

const ButtonOrder = ({cartId}: ButtonOrderProps) => {
    const router = useRouter();

    const handleOrder = async () => {
        const status = await orderBook(cartId);

        if(status){
            toast("Uspešno ste obavili kupovinu");
            router.push('/books');
        }
    }

    return (
        <Button onClick={handleOrder} size="lg" variant="outline" className='hover:bg-red-500 w-xs flex mx-auto my-10'>Order</Button>
    )
}

export default ButtonOrder