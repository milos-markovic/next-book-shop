'use client'

import { Card } from '@/components/ui/card'
import InputField from '@/components/InputField'
import InputTextarea from '@/components/InputTextarea'
import InputSelect from '@/components/InputSelect'
import InputFile from '@/components/InputFile'
import InputSubmit from '@/components/InputSubmit'
import { useActionState, useEffect, useState } from 'react'
import { createBook } from '@/action/Book'
import { initialState } from '@/lib/validate'
import { useRouter } from "next/navigation"
import { toast } from 'sonner'


type CreateBookFormProps = {
  categoryItems: {value: string; label: string}[];
  filterItems: {value: string; label: string}[];
}

const CreateBookForm = ({categoryItems, filterItems}: CreateBookFormProps) => {
  const router = useRouter();

  const [state, formAction, pending] = useActionState(createBook, initialState);

  const [changedCategoryName, setCategoryName ] = useState<string | undefined>('');
  
  const isChildrenBook = changedCategoryName === 'Knjige za decu';


  useEffect(() => { 
    if (state.success) {
      toast("Book has been created.")
      router.push('/admin/books');
    }
  }, [state, router]);

  return (
    <Card className='max-w-md w-full'>
        <form action={formAction} className='p-4 space-y-4'>
            <InputField type="text" name="title" label="Title" errors={state?.errors?.title} isRequired={true} />

            <InputField type="text" name="author" label="author" errors={state?.errors?.author} isRequired={true} />

            <InputField type="text" name="publisher" label="publisher" errors={state?.errors?.publisher} isRequired={true} />

            <InputField type="number" name="pages" label="Pages" errors={state?.errors?.pages} isRequired={true} />

            <InputField type="text" name="format" label="Format" placeholder='14 x 19 cm' errors={state?.errors?.format} isRequired={true} />

            <InputField type="number" name="year" label="Year" errors={state?.errors?.year} isRequired={true} />

            <InputTextarea name="description" label="Description" errors={state?.errors?.description} isRequired={true} />

            <InputField type="text" name="price" label="Price" errors={state?.errors?.price} isRequired={true} />

            <InputSelect label="Letter" name="letter" placeholder="Choose letter" items={[{value: "cyrilic", label: "Cyrilic"}, {value: "latin", label: "Latin"}]} errors={state?.errors?.letter} isRequired={true} />

            <InputSelect label="Binding" name="binding" placeholder="Choose binding" items={[{value: "hard", label: "Hard"}, {value: "soft", label: "Soft"}]} errors={state?.errors?.binding} isRequired={true} />

            <InputSelect label="Category" name="category" placeholder="Choose category" items={categoryItems} errors={state?.errors?.category} isRequired={true} setCategoryName={setCategoryName} />

            {isChildrenBook && <InputSelect name="filter" label="Filters" items={filterItems} placeholder="Choose filter" />}
            
            <InputFile name="image" label="Cover Image" errors={state?.errors?.image} isRequired={true} />   
            
            <InputSubmit label={pending ? "Creating..." : "Create Book"} /> 
        </form>
    </Card>
  )
}

export default CreateBookForm