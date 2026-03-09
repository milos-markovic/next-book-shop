import { deleteFilter } from "@/action/Filter";
import DeleteBtn from "@/components/DeleteBtn";
import { Button } from "@/components/ui/button";
import { Filter } from "@/models/Filter"
import Link from "next/link";

const Filters = async () => {
    const filters = await Filter.find({}).sort({createdAt: -1}).lean();

    
    if(!filters.length){
        return <h2 className="title">No Filters</h2>
    }

    return (
        <div>
            <h2 className="title">Filters</h2>

            <ul className="space-y-3">
                {filters.map(filter => 
                    <li key={filter._id.toString()}>
                        <p className="text-lg">{filter.name}</p>
                        <Link href={`/admin/filters/edit/${filter._id}`} className='text-blue-500 hover:underline'>
                            Edit
                        </Link>
                        <DeleteBtn 
                            action={deleteFilter} 
                            id={filter._id.toString()}
                            title="Delete Category"
                            deleteMessage="Category deleted successfully" 
                            dialogMessage={`Are you sure you want to delete the filter`}
                        />
                    </li>
                )}
            </ul>

            <Button asChild className="mt-5">
                <Link href="/admin/filters/create">
                    Create Filter
                </Link>
            </Button>
        </div>
    )
}

export default Filters