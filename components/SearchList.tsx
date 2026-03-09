import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

type SearchItem = {
    _id: string
    title: string,
    img: string
}

type SearchListProps = { 
    searchList: SearchItem[]
    setSearchValue: (val: string) => void
}

function SearchList({searchList = [], setSearchValue}: SearchListProps) {
    const router = useRouter();

    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setSearchValue('');
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const hideSearchList = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        setSearchValue("")

        router.push(`/book/${id}`);
    }

    return (
        <div ref={containerRef} className="border border-border rounded divide-y absolute top-10 left-0 w-full z-10">
            {searchList.map((item, index) => {
                const isFirstItem = index == 0;
                const isLastItem = searchList.length -1; 

                return (
                    <Link href="" onClick={(e) => hideSearchList(e, item._id)} className={`flex items-center gap-2 p-1 bg-card text-foreground font-medium hover:bg-secondary dark:hover:brightness-110 ${isFirstItem  && 'rounded-t'} ${isLastItem && 'rounded-b'} `} key={item.title}>
                        <Image src={item.img} alt={item.title} width={30} height={70} />
                        <p className="">{item.title}</p>
                    </Link>
                )
            })}
        </div>
    )
}

export default SearchList