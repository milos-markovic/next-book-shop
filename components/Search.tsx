'use client'

import { searchBooks } from '@/action/Book';
import { cn } from '@/lib/utils';
import { Search as SearchIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import SearchList from './SearchList';

type SearchProps = {
    className?: string
}

type List = {
    _id: string
    title: string,
    img: string
}

const Search = ({className = ''}: SearchProps) => {
    const [searchValue, setSearchValue] = useState('');
    const [searchList, setSearchList] = useState<List[]>([]);

    useEffect(() => {
        if(searchValue){
            const getSearchList = async () => {
                const books = await searchBooks(searchValue);
                setSearchList(books)
            }
    
            getSearchList();
        }
    },[searchValue])

    return (
        <div className="relative">
            <div className={cn(
                    "flex items-center bg-white/5 px-3 outline-1 -outline-offset-1 outline-gray-700 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-500 rounded",
                    className
                )}>
                <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} type="text" name="search" placeholder="Search" className='block w-60 grow py-1.5 pr-3 pl-1 text-base text-black dark:text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6' />
                <SearchIcon className='text-gray-600' />
            </div>
            {searchValue && searchList.length > 0 && <SearchList searchList={searchList} setSearchValue={setSearchValue} />}
        </div>
    )
}

export default Search