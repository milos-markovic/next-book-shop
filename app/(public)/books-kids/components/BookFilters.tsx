import { getFilters } from '@/action/Filter'
import { FilterType } from '@/models/Filter'
import { useEffect, useState } from 'react'

type BookFiltersType = {
    selectedFilters: string[]
    setSelectedFilters: (val: string[]) => void
}

const BookFilters = ({selectedFilters, setSelectedFilters}: BookFiltersType) => {

const [filters, setFilters] = useState<FilterType[]>([])

  useEffect(() => {
    const fetchFilters = async () => {
      const findFilters = await getFilters();
      setFilters(findFilters);
    }

    fetchFilters();
  },[])

  const handleFilterChange = (filterId: string) => {
    if(selectedFilters.includes(filterId)){
      const filters = selectedFilters.filter(id => id !== filterId);

      setSelectedFilters(filters)
    }else{
      setSelectedFilters([...selectedFilters, filterId])
    }
  }

  return (
    <ul className="space-y-2">
        {filters && filters.map(filter => <li key={filter._id.toString()}>
            <input 
              onChange={() => handleFilterChange(filter._id.toString())} 
              type="checkbox" 
              name="filter" 
              value={filter._id.toString()} 
              checked={selectedFilters.includes(filter._id.toString())}
              className="mr-3" 
            />
            {filter.name}
        </li>)}
    </ul>
  )
}

export default BookFilters