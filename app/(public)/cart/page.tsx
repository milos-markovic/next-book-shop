import CartMain from './components/CartMain';
import { getCart } from '@/action/Cart';

const CartPage = async () => {
  const {cart, sumPrice} = await getCart();

  if(!cart){
    return <h2 className="title">Korpa je prazna</h2>
  }

  return (
    <CartMain 
      items={cart.items} 
      sumPrice={sumPrice} 
    /> 
  )
}

export default CartPage