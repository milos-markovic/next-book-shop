import React from 'react'
import { Card, CardFooter } from './ui/card'
import Image from 'next/image'
import { BookType } from '@/models/Book'
import Link from 'next/link'

type BookProps = {
  book: BookType,
  bgCard?: string
}

const BookCard = ({ book, bgCard = "bg-card" }: BookProps) => {
  return (
    <Link href={`/book/${book._id}`}>
      <Card key={book._id.toString()} className={`flex flex-col min-h-83 items-center ${bgCard} hover:bg-secondary dark:hover:brightness-110 border border-border rounded-[12px] transition`}>
          <Image priority src={book.img} alt={book.title} width={100} height={150} />
          
          <CardFooter className='flex flex-col text-center gap-2'>
              <h3 className="text-lg text-foreground font-medium">{book.title}</h3>
              <p className="text-sm text-muted-foreground">by {book.author}</p>
          </CardFooter>  
      </Card>
    </Link>
  )
}

export default BookCard