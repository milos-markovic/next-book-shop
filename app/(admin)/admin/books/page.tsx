import { deleteBook, getBooks } from "@/action/Book";
import Table from "@/components/Table";
import Link from "next/link";
import Image from "next/image";
import DeleteBtn from "@/components/DeleteBtn";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/Pagination";

async function Books({
  searchParams,
}: {
  searchParams: Promise<{ [page: string]: string | string[] | undefined }>
}) {
    const page = Number((await searchParams)?.page) || 1;

    const {books, totalPages} = await getBooks({page: page, limit: 4});

    const theads = ["Title", "Author", "Image", "Price", "Category",'',''];


    if(!books.length){
        return <h2 className="title">No Books</h2>
    }

    return (
        <div className="flex flex-col items-center">
            <h2 className="title">Books</h2>

            <Table theads={theads}>     
                {books.map((book) => (
                    <tr key={book.title}>
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td>
                            <Image priority src={book.img} alt={book.title} width={50} height={75} />
                        </td>
                        <td>{book.price} din</td>
                        <td>{book.category.name}</td>
                        <td>
                            <Link href={`/admin/books/edit/${book._id.toString()}`} className="text-blue-500 hover:underline">
                                Edit
                            </Link>
                        </td>
                        <td>
                            <DeleteBtn 
                                action={deleteBook} 
                                id={book._id.toString()}
                                title="Delete Book"
                                deleteMessage="Book deleted successfully" 
                                dialogMessage={`Are you sure you want to delete the book "${book.title}"? This action cannot be undone.`}       
                            />
                        </td>
                    </tr>
                ))}    
            </Table>

            <Pagination
                page={page}
                totalPages={totalPages}
            />

            <Button asChild className="mt-3">
                <Link href="/admin/books/new">
                    Add New Book
                </Link> 
            </Button>        
        </div>
    )
}

export default Books