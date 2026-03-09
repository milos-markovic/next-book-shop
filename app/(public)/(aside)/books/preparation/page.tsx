import { getBooks } from '@/action/Book';
import BookCard from '@/components/BookCard';
import Pagination from '@/components/Pagination';

async function PreparationBooks({
  searchParams,
}: {
  searchParams: Promise<{ [page: string]: string | string[] | undefined }>
}) {
  const page = Number((await searchParams).page) || 1;

  const {books, totalPages} = await getBooks({page}, {inPreparation: true});
  

  if(!books.length){
    return <h2 className="title">No books</h2>
  }

  return (
    <>
        <h2 className="title">Knjige u pripremi</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {books.map(book => <BookCard key={book._id} book={book} />)}
        </div>

        <Pagination 
          page={page} 
          totalPages={totalPages}
          pageUrl='/books/preparation'
        />
    </>
  )
}

export default PreparationBooks