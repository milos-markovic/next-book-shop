import React from 'react'
import Table from '@/components/Table';
import { getCarts } from '@/action/Cart';

const CartPage = async () => {
  const carts = await getCarts();

  if(!carts.length){
    return <h2 className="title">No carts</h2>
  }

  return (
    <div className="flex flex-col items-center">
        <h2 className="title">Shoping carts</h2>

        <Table theads={['#','ordered books', 'customer','status','payment type']}>
            {
                carts.map((cart, index) => {
                    const {items, status, customer, payment} = cart;

                    return (
                        <tr key={cart._id.toString()}>
                            <td>{index + 1}</td>
                            <td className="text-left">
                                {items.map((item, itemIndex) => {
                                    const {book} = item;

                                    return (
                                        <p key={itemIndex}>{book.title}</p>
                                    )
                                })}
                            </td>
                            <td className="text-left">
                                <p>{customer.name}</p>
                                <p>{customer.email}</p>
                                <p>{customer.address}</p>
                                <p>{customer.phone}</p>
                            </td>
                            <td>{status}</td>
                            <td>{payment.method}</td>
                        </tr>
                    )
                })
            }
        </Table>
    </div>
  )
}

export default CartPage