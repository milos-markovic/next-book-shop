import { Category } from "@/models/Category";
import CreateBookForm from "./components/CreateBookForm";
import { Filter } from "@/models/Filter";

const CreateBook = async () => {
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
      <h2 className='text-xl mb-8'>Create Book</h2>

      <CreateBookForm categoryItems={categoryItems} filterItems={filterItems}  />
    </div>
  )
}

export default CreateBook