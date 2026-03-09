import { ArrowLeft, ArrowRight } from 'lucide-react'
import Link from 'next/link'

type PaginationProps = {
    page?: number,
    totalPages?: number,
    pageUrl?: string
}

const Pagination = ({page = 1, totalPages = 10, pageUrl = '/admin/books'}: PaginationProps) => {
  return (
    <div className='flex justify-around items-baseline w-full my-5'>
        {page > 1 && (
          <Link href={`${pageUrl}?page=${page - 1}`} className="mt-5 flex gap-1 text-blue-600">
            <ArrowLeft /> 
            Previous
          </Link>
        )}

        <span style={{ margin: "0 10px" }}>
          Page {page} of {totalPages}
        </span>

        {/* Next Button */}
        {page < totalPages && (
          <Link href={`${pageUrl}?page=${page + 1}`} className='mt-5 flex gap-1 text-blue-600'>
            Next
            <ArrowRight />
          </Link>
        )}
    </div>
  )
}

export default Pagination