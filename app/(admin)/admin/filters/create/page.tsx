'use client'

import { insertFilter } from '@/action/Filter';
import InputField from '@/components/InputField';
import { Card } from '@/components/ui/card';
import { useForm } from '@/hooks/use-form';


const CreateCategory = () => {
  const {state, action} = useForm(insertFilter, '/admin/filters', 'Filter created successfully');

  return (
    <div>
        <h2 className='text-xl mb-8'>Create Filter</h2>

        <Card className='max-w-lg rounded'>
            <div className='mx-auto'>
                <form action={action} >
                    <div className="flex items-end gap-2">        
                        <InputField type="text" name="name" placeholder='Filter name' label="Name" errors={state.errors?.name} />
                        
                        <button type="submit" className='bg-blue-500 text-white px-4 py-2 rounded mb-1'>Add Filter</button>
                    </div>
                </form>
            </div>
        </Card>
    </div>
  )
}

export default CreateCategory