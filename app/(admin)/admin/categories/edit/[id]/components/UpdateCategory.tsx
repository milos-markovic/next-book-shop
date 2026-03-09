'use client';

import { updateCategory } from '@/action/Category';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useForm } from '@/hooks/use-form';

type UpdateCategoryProps = {
  id: string;
  name: string;
};

const UpdateCategory = ({ id, name }: UpdateCategoryProps) => {

const {state, action} = useForm(updateCategory, '/admin/categories', 'Category updated successfully');

  return (
    <Card className='max-w-lg rounded'>
        <div className='mx-auto'>
            <form action={action} >
                <div className="flex items-end gap-2">
                    <input type="hidden" name="categoryId" value={id} />
                    <div>
                        <label htmlFor="name">Name:</label>
                        <Input type="text" id="name" name="name" placeholder="Category Name" defaultValue={name} className='mt-1' />
                    </div>
                    <div>
                        <button type="submit" className='bg-blue-500 text-white px-4 py-2 rounded mt-4'>Update Category</button>
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

export default UpdateCategory