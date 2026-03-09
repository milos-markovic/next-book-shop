import { getCategory } from "@/action/Category"
import UpdateCategory from "./components/UpdateCategory";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const {name} = await getCategory(id);

  return (
    <div>
      <h1 className="text-xl mb-8">Update category: {name}</h1>
    
      <UpdateCategory id={id} name={name} />
    </div>
  )
}