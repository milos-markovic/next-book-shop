import { getFilter } from "@/action/Filter";
import UpdateFilter from "../components/UpdateFilter";


export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const {name} = await getFilter(id);

 
  return (
    <div>
      <h1 className="text-xl mb-4">Update category: {name}</h1>
    
      <UpdateFilter filterId={id} name={name} />
    </div>
  )
}