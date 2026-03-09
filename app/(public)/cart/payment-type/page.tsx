'use client'

import { insertPaymentType } from '@/action/Cart';
import InputSelect from '@/components/InputSelect'
import { Button } from '@/components/ui/button'
import { useForm } from '@/hooks/use-form';
import { paymentTypes } from '@/links/cartMenu'

const PaymentType = () => {
  const redirectUrl = '/cart/buying';
  
  const {state, action} = useForm(insertPaymentType, redirectUrl, 'Izabrali ste tip kupovine')

  return (
    <div className="flex w-xs mx-auto">
      <form action={action} className="w-full">
        <InputSelect 
          name="paymentMethod" 
          label="Način plaćanja" 
          items={paymentTypes} 
          placeholder='Select payment type' 
          errors={state?.errors?.paymentMethod}
        />

        <Button type="submit" variant="ghost" size="lg" className="flex w-xs mx-auto mt-10 text-red-500">
          DALJE
        </Button>
      </form>
    </div>
  )
}

export default PaymentType