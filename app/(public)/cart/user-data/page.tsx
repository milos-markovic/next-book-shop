'use client'

import { insertUserData } from '@/action/Cart'
import InputField from '@/components/InputField'
import { Button } from '@/components/ui/button'
import { useForm } from '@/hooks/use-form'

const UserData = () => {
  const redirectUrl = '/cart/payment-type';

  const {state, action} = useForm(insertUserData, redirectUrl, 'Uneseni su podaci korisnika')

  return (
    <form action={action} className="space-y-4 max-w-xl mx-auto">
      <InputField name="name" label="Ime" errors={state?.errors?.name} />
      <InputField name="email" label="Email" placeholder='test@mail.com' errors={state?.errors?.email} />
      <InputField name="address" label="Adresa (Naziv ulice, broj kuce, grad)" errors={state?.errors?.address} />
      <InputField name="phone" label="Telefon" errors={state?.errors?.phone} />

      <Button type="submit" variant="ghost" size="lg" className="flex w-xs mx-auto mt-10 text-red-500">
        DALJE
      </Button>
    </form>
  )
}

export default UserData