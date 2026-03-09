import { getBook } from "@/action/Book";
import UpdateBookForm from "./components/UpdateBookForm";
import { Category } from "@/models/Category";
import { Filter } from "@/models/Filter";

export default async function EditBook({
  params,
}: {
  params: Promise<{ id: string }>
}) {
    const { id } = await params
 
    const book = await getBook(id);

    const categories = await Category.find({},'name').lean();   
    const categoryItems = categories.map(category => ({
        value: category._id.toString(),
        label: category.name
    }));

    const filters = await Filter.find({}).sort({createdAt: -1}).lean();
    const filterItems = filters.map(filter => {
      return {
        value: filter._id.toString(),
        label: filter.name
      }
    })


    return (
      <div className="flex flex-col items-center">
        <h1 className="text-2xl mb-8">Update book: <span className="text-yellow-500">{book?.title}</span></h1>

        <UpdateBookForm 
          book={book} 
          categoryItems={categoryItems} 
          filterItems={filterItems}
        />
      </div>
    )
}