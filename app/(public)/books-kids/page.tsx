'use client'

import { useEffect, useState } from 'react';
import BookFilters from './components/BookFilters';
import { getChildrenBooks } from '@/action/Book';
import { BookType } from '@/models/Book';
import BookCard from '@/components/BookCard';
import { useSearchParams } from 'next/navigation'
import Pagination from '@/components/Pagination';


const BooksKids = () => {
  const searchParams = useSearchParams()
  const page = Number(searchParams.get('page')) || 1;

  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [books, setBooks] = useState<BookType[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);

  useEffect(() => {
    const fetchBooks = async () => {
      const {findBooks, totalPages} = await getChildrenBooks(selectedFilters, {page: page});
      setBooks(findBooks)
      setPageNumber(totalPages)
    }

    fetchBooks();
    
  },[selectedFilters, page])


  if(!books.length){
    return <h2 className="title">No books</h2>
  }

  return (
    <section className='flex space-x-4 min-h-screen'>
      <aside className="border-r border-accent-foreground px-4">
        <BookFilters 
          selectedFilters={selectedFilters} 
          setSelectedFilters={setSelectedFilters} 
        />
      </aside>

      <section className="flex-1">
        <h2 className="title">Knjige za decu</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {books.map((book, index) => <BookCard key={index} book={book} />)}
        </div>

        <Pagination
          page={page}
          totalPages={pageNumber}
          pageUrl='/books-kids' 
        />
      </section>
    </section>
  )
}

export default BooksKids