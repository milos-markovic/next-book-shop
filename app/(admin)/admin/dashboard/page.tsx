import { countDocuments } from '@/action/Dashboard'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

const Dashboard = async () => {
  const {
      countBooks,
      countCategories,
      countFilters,
      countOrders,
      countUsers
  } = await countDocuments()

  return (
    <>
      <h2 className='title'>Dashboard</h2>
  
      <div className="grid grid-cols-3 gap-10 mt-10">
        <Card className='gap-0 rounded'>
          <CardContent className="flex flex-col items-center">
            <h2 className='title mb-2 font-medium'>Books</h2>
            <Badge variant="destructive" className="w-8 aspect-square text-lg">
              {countBooks}
            </Badge>
          </CardContent>
        </Card>
        <Card className='gap-0 rounded'>
          <CardContent className="flex flex-col items-center">
            <h2 className='title mb-2 font-medium'>Categories</h2>
            <Badge variant="destructive" className="w-8 aspect-square text-lg">
              {countCategories}
            </Badge>
          </CardContent>
        </Card>
        <Card className='gap-0 rounded'>
          <CardContent className="flex flex-col items-center">
            <h2 className='title mb-2 font-medium'>Filters</h2>
            <Badge variant="destructive" className="w-8 aspect-square text-lg">
              {countFilters}
            </Badge>
          </CardContent>
        </Card>
        <Card className='gap-0 rounded'>
          <CardContent className="flex flex-col items-center">
            <h2 className='title mb-2 font-medium'>Orders</h2>
            <Badge variant="destructive" className="w-8 aspect-square text-lg">
              {countOrders}
            </Badge>
          </CardContent>
        </Card>
        <Card className='gap-0 rounded'>
          <CardContent className="flex flex-col items-center">
            <h2 className='title mb-2 font-medium'>Users</h2>
            <Badge variant="destructive" className="w-8 aspect-square text-lg">
              {countUsers}
            </Badge>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default Dashboard