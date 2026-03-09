import { getBooks } from "@/action/Book";
import BookCard from "@/components/BookCard";
import Pagination from "@/components/Pagination";
import { Category } from "@/models/Category";


export default async function CategoryBooks({
  params,
  searchParams,
}: {
  searchParams: Promise<{ [page: string]: string | string[] | undefined }>,
  params: Promise<{ category: string }>
}) {
  const page = Number((await searchParams).page) || 1;

  const { category } = await params
  const bookCategory = await Category.findById(category);
  
  const {books, totalPages} = await getBooks({page},{category: category})

  if(!books.length){
    return <h2 className="title">Nema knjiga iz kategorije: <span className="text-accent">{bookCategory.name}</span></h2>
  }

  return (
    <>
      <h1 className="title">Knjige iz kategorije: <span className="text-red-700 dark:text-yellow-500">{bookCategory.name}</span> </h1>
    
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {books.map(book => <BookCard key={book._id} book={book} />)}
      </div>

      <Pagination 
        page={page}
        totalPages={totalPages}
        pageUrl={`/categories/${category}/books`} 
      />
    </>
  )
}