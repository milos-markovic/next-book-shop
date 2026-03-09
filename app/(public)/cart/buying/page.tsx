import { getCart } from '@/action/Cart';
import CartItems from '../components/CartItems';
import { Card, CardContent } from '@/components/ui/card';
import ButtonOrder from '../components/ButtonOrder';

const Buying = async () => {
  const {cart, sumPrice} = await getCart();

   if(!cart){
    return <h2 className="text-xl text-center">Cart is empty</h2>
  }
  
  return (
    <div>
      <CartItems items={cart.items} sumPrice={sumPrice} />

      <Card className="w-xs ml-auto my-10 bg-transparent">
        <CardContent>
          <h3 className="text-lg">Način plaćanja:</h3>
          <p className="text-red-500 first-letter:uppercase">{cart.payment.method}</p>
        </CardContent>
      </Card>

      <Card className='w-xs ml-auto bg-transparent'>
        <CardContent>
          <h3 className="text-lg mb-2">Naručilac</h3>
          <ul>
            <li>Name: <span className="text-red-500">{cart.customer.name}</span></li>
            <li>Email: <span className="text-red-500">{cart.customer.email}</span></li>
            <li>Address: <span className="text-red-500">{cart.customer.address}</span></li>
            <li>Phone: <span className="text-red-500">{cart.customer.phone}</span></li>
          </ul>
        </CardContent>
      </Card>

      <ButtonOrder cartId={cart._id} />
    </div>
  )
}

export default Buying