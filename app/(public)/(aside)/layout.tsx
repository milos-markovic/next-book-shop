
import { getCategories } from "@/action/Category";
import Link from "next/link";

export default async function AsidePagesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const {categories} = await getCategories({});

  return <section className="flex space-x-4 min-h-screen">
    <aside className="border-r px-4 space-y-1 font-medium">
        {categories.map((category) => (
            <div key={category._id.toString()}>
                <Link href={`/categories/${category._id.toString()}/books`} className="hover:underline">
                    {category.name}
                </Link>
            </div>
        ))}
    </aside>
    
    <section className="flex-1 px-4">
        {children}
    </section>
  </section>
}