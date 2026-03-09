'use client'

import { updateBook } from '@/action/Book'
import InputField from '@/components/InputField'
import InputFile from '@/components/InputFile'
import InputSelect from '@/components/InputSelect'
import InputSubmit from '@/components/InputSubmit'
import InputTextarea from '@/components/InputTextarea'
import { Card } from '@/components/ui/card'
import { initialState } from '@/lib/validate'
import { BookType } from '@/models/Book'
import { useRouter } from 'next/navigation'
import { useActionState, useEffect, useState } from 'react'
import { toast } from 'sonner'
import InputCheckbox from '@/components/InputCheckbox'

type EditBookFormProps = {
  book: BookType,
  categoryItems: {value: string; label: string}[];
  filterItems: {value: string; label: string}[]
}

const UpdateBookForm = ({book, categoryItems, filterItems}: EditBookFormProps) => {
   const router = useRouter();

  const [state, formAction, pending] = useActionState(updateBook, initialState);

  const selectedLetter = {value: book.letter, label: book.letter.charAt(0).toUpperCase() + book.letter.slice(1)};
  const selectedBinding =  {value: book.binding, label: book.binding.charAt(0).toUpperCase() + book.binding.slice(1)};
  const selectedCategory = categoryItems.find(item => item.value === book.category._id.toString());
  const selectedFilter = filterItems.find(item => item.value === book.filter?.toString());

  const [changedCategoryName, setCategoryName ] = useState<string | undefined>(selectedCategory?.label);

  const isChildrenBook = changedCategoryName === 'Knjige za decu';


  useEffect(() => { 
      if (state.success) {
        toast("Book has been updated.")
        router.push('/admin/books');
      }
  }, [state, router]);

  return (
    <>
        <Card className='max-w-md w-full'>
            <form action={formAction} className='p-4 space-y-4'>
                <input type="hidden" name="id" value={book._id.toString()} />

                <InputField type="text" name="title" label="Title" defaultValue={book?.title} errors={state?.errors?.title} isRequired={true} />

                <InputField type="text" name="author" label="author" defaultValue={book?.author} errors={state?.errors?.author} isRequired={true} />

                <InputField type="text" name="publisher" label="publisher" defaultValue={book?.publisher} errors={state?.errors?.publisher} isRequired={true} />
                
                <InputField type="number" name="pages" label="Pages" defaultValue={book?.pages} errors={state?.errors?.pages} isRequired={true} />

                <InputField type="text" name="format" label="Format" defaultValue={book?.format} errors={state?.errors?.format} isRequired={true} />

                <InputField type="number" name="year" label="Year" defaultValue={book?.year} errors={state?.errors?.year} isRequired={true} />

                <InputTextarea name="description" label="Description" defaultValue={book?.description} errors={state?.errors?.description} isRequired={true} />

                <InputField type="text" name="price" label="Price" defaultValue={book?.price} errors={state?.errors?.price} isRequired={true} />

                <InputSelect label="Letter" name="letter" placeholder="Choose letter" items={[{value: "cyrilic", label: "Cyrilic"}, {value: "latin", label: "Latin"}]} selectedValue={selectedLetter} errors={state?.errors?.letter} isRequired={true} />

                <InputSelect label="Binding" name="binding" placeholder="Choose binding" items={[{value: "hard", label: "Hard"}, {value: "soft", label: "Soft"}]} selectedValue={selectedBinding} errors={state?.errors?.binding} isRequired={true} />

                <InputSelect label="Category" name="category" placeholder="Choose category" items={categoryItems} selectedValue={selectedCategory} errors={state?.errors?.category} isRequired={true} setCategoryName={setCategoryName}  />

                {isChildrenBook && <InputSelect name="filter" label="Filters" items={filterItems} placeholder="Choose filter" selectedValue={selectedFilter}/>}
            
                <InputFile name="image" label="Cover Image" errors={state?.errors?.image} currentImage={book?.img} />   

                <InputCheckbox name="inPreparation" label="In preparation" defaultValue={book.inPreparation} />

                {/* <InputSwitch filterItems={filterItems} selectedValue={selectedFilter} /> */}

                <InputSubmit label={pending ? "Updating..." : "Update Book"} /> 
            </form>
        </Card>
    </>
  )
}

export default UpdateBookForm