import { Card, CardContent, CardHeader } from '@/components/ui/card'
import React from 'react'

const CartAside = () => {
  return (
    <aside className="w-50">
        <Card className="bg-transparent">
            <CardHeader className="border-b">
                <h3 className="text-lg text-primary font-semibold">Popust</h3>
            </CardHeader>
            <CardContent className='space-y-4'>
                <p>Članovima Kluba čitalaca u slučaju naručivanja tri ili više naslova odobravamo dodatni popust od <span className="text-primary font-semibold">10%</span> . Popust za članove kluba <span className="text-primary font-semibold">10, 15 i 20%</span> za knjige i <span className="text-primary font-semibold">10%</span> za drustvene igre. </p>
                <p>Za porudžbine iz Srbije <span className="text-primary font-semibold">dostava je besplatna</span> za iznose preko 3000 dinara. </p>
            </CardContent>
        </Card>
    </aside>
  )
}

export default CartAside