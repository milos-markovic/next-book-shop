
import { deleteCategory, getCategories } from '@/action/Category';
import DeleteBtn from '@/components/DeleteBtn';
import Pagination from '@/components/Pagination';
import { Button } from '@/components/ui/button';
import Link from 'next/link';


export default async function Categories({
  searchParams,
}: {
  searchParams: Promise<{ [page: string]: string | string[] | undefined }>
}) {
    const page = Number((await searchParams).page) || 1;

    const {categories, totalPages} = await getCategories({page, limit: 4})


    if(!categories.length){
        return <h2 className="title">No categories</h2>
    }

    return (
        <>
            <h2 className='title'>Categories</h2>

            {categories.map((category) => (
                <div key={category._id.toString()} className="p-4 border-b">
                    <h3 className="text-lg font-medium">{category.name}</h3>
                    <Link href={`/admin/categories/edit/${category._id}`} className='text-blue-500 hover:underline'>
                        Edit
                    </Link>
                    <DeleteBtn 
                        action={deleteCategory} 
                        id={category._id.toString()}
                        title="Delete Category"
                        deleteMessage="Category deleted successfully" 
                        dialogMessage={`Are you sure you want to delete the category "${category.name}"? This action will also delete books in this category and cannot be undone.`}
                    />
                </div>
            ))}

            <Pagination 
                page={page}
                totalPages={totalPages}
                pageUrl='/admin/categories'
             />

            <Button asChild className="mt-5">
                <Link href="/admin/categories/create">
                    Create Category
                </Link>
            </Button>
        </>
    )
}

