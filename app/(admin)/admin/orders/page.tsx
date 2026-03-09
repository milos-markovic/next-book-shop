import { deleteOrder } from '@/action/Order';
import DeleteBtn from '@/components/DeleteBtn';
import Table from '@/components/Table';
import { Order, OrderType } from '@/models/Order'

const Orders = async () => {
  const orders: OrderType[] = await Order.find({})
  .populate({
    path: 'cart',
    populate: {
      path: 'items.book'
    }
  })
  .sort({createdAt: -1})
  .lean();

  if(!orders.length){
    return <h2 className="title">No orders</h2>
  }

  return (
    <div className="flex flex-col items-center">
        <h2 className='title'>Orders</h2>
        
        <Table theads={['#','ordered books', 'customer','total price','status','payment type']}>
          {orders.map((order, index) => {
            const {customer, total, status, paymentMethod} = order
            const items = order.cart?.items || [];

            return (
              <tr key={index}>
                <td>{index + 1}.</td>
                <td className="text-left">
                  {items?.map((item, itemIndex) => {
                    const {book} = item;
                    
                    return (
                      <p key={itemIndex}>{book.title}</p>
                    )
                  })}
                </td>
                <td className='text-left'>
                  <p>{customer.name}</p>
                  <p>{customer.email}</p>
                  <p>{customer.address}</p>
                  <p>{customer.phone}</p>
                </td>
                <td>{total}</td>
                <td>{status}</td>
                <td>{paymentMethod}</td>

                {status === 'paid' && <td>
                    <DeleteBtn 
                        action={deleteOrder} 
                        id={order._id.toString()}
                        title="Delete Order"
                        deleteMessage="Order is deleted successfully" 
                        dialogMessage={`Are you sure you want to delet order? This will also delete cart. This action cannot be undone.`}       
                    />
                </td>}
              </tr>
            )
          })}
        </Table>
    </div>
  )
}

export default Orders