'use client'

import { addCategory } from '@/action/Category'
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input'
import { useForm } from '@/hooks/use-form';


const CreateCategoryForm = () => {
  const {state, action} = useForm(addCategory, '/admin/categories', 'Category created successfully');

  return (
    <Card className='max-w-lg rounded'>
        <div className='mx-auto'>
            <form action={action} >
                <div className="flex items-end gap-2">
                    <div>
                        <label htmlFor="name">Name:</label>
                        <Input type="text" id="name" name="name" placeholder="Category Name" className='mt-1' />
                    </div>
                    <div>
                        <button type="submit" className='bg-blue-500 text-white px-4 py-2 rounded mt-4'>Add Category</button>
                    </div>
                </div>
    
                {state.errors?.name && (
                    <div className='text-red-500 mt-1 block'>
                        {state.errors.name.map((error, index) => (      
                            <div key={index}>{error}</div>
                        ))}
                    </div>
                )} 
            </form>
        </div>
    </Card>
  )
}

export default CreateCategoryForm