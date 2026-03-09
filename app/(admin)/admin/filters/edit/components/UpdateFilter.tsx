'use client';

import { updateFilter } from '@/action/Filter';
import InputField from '@/components/InputField';
import { useForm } from '@/hooks/use-form';

type UpdateFilterProps = {
  filterId: string;
  name: string;
};

const UpdateFilter = ({ filterId, name }: UpdateFilterProps) => {
    const {state, action} = useForm(updateFilter, '/admin/filters', 'Filter updated successfully');

    return (
        <form action={action} >
            <div className="flex items-center gap-2">
                <input type="hidden" name="filterId" value={filterId} />
                <InputField name="name" label="Name" defaultValue={name} errors={state.errors?.name} />
                <button type="submit" className='bg-blue-500 text-white px-4 py-2 rounded mt-4'>Update Filter</button>
            </div>
        </form>
    )
}

export default UpdateFilter