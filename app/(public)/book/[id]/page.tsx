import { Card } from "@/components/ui/card";
import { Book } from "@/models/Book"
import Image from "next/image";
import AddCartBtn from "./AddCartBtn";

export default async function BookPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const book = await Book.findById(id).populate('category','name');

  return (
    <div className="grid grid-cols-8 divide-x divide-border min-h-80">
      <aside className="pr-4">
        <Image priority src={book.img} alt={book.title} width={150} height={300} />

        <div className="mt-8 text-center">
            <p><span className="text-foreground font-bold">Format:</span> {book.format}</p>
            <p><span className="text-foreground font-bold">Page number:</span> {book.pages}</p>
            <p><span className="text-foreground font-bold">Letter:</span> {book.letter}</p>
            <p><span className="text-foreground font-bold">Binding:</span> {book.binding}</p>
            <p><span className="text-foreground font-bold">year:</span> {book.year}</p>
            <p><span className="text-foreground font-bold">publisher:</span> {book.publisher}</p>
        </div>
      </aside>

      <section className="col-span-5 px-4">
        <h2 className="text-2xl text-primary font-medium">{book.title}</h2>
        <h3 className="text-foreground font-medium">{book.author}</h3>
        <p className="mt-2">category: <span className="text-accent font-semibold">{book.category.name}</span></p>

        <div className="mt-8">
            <h3 className="mb-5">Book description</h3>

            <p>{book.description}</p>
        </div>
      </section>

      <aside className="col-span-2 pl-4">
        <Card className="bg-transparent gap-0 py-0">
            <div className="p-2 px-4">
                <h2 className="text-primary font-semibold text-lg">Price</h2>
            </div>
            <div className="border-t p-4">
                <p className="font-bold">
                    <span className="text-foreground">Price:</span> <span className="dark:text-accent">{book.price} din</span>
                </p>
            </div>
        </Card>

       <AddCartBtn bookId={id} />
      </aside>
    </div> 
  )
}