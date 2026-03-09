'use client'

import { cartMenu } from '@/links/cartMenu'
import Link from 'next/link';
import { usePathname } from 'next/navigation'

const CartMenu = () => {
  const path = usePathname();

  return (
    <div className='mb-10 mt-2'>
        {cartMenu.map((item, index) => <span className={`${path === item.href ? 'bg-red-800 text-white': 'text-black dark:text-foreground'} px-5 py-2 font-medium`} key={index}>{item.label}</span>)}
    </div>
  )
}

export default CartMenu