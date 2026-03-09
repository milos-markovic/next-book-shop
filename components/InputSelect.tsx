import { useState } from 'react';
import { Select } from './ui/select'
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

type Item = {value: string; label: string}

type InputSelectProps = {
    label?: string;
    name: string;  
    placeholder?: string;
    items: Item[];
    selectedValue?: Item;
    errors?: string[];
    isRequired?: boolean,
    setCategoryName?: (val: string) => void
}

const InputSelect = ({label = '', name, placeholder = '', items, selectedValue, errors = [], isRequired, setCategoryName}: InputSelectProps) => {
    const [value, setValue] = useState<Item | undefined>(selectedValue)

    const handleChange = (newValue: string) => {
        const selectedItem = items.find(item => item?.value === newValue)

        setValue(selectedItem)

        if(selectedItem && setCategoryName){
            setCategoryName(selectedItem.label);
        }
    }

    return (
        <div>
            <label htmlFor={name}>
                {label}
                {isRequired && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className='mt-1'>
                <Select name={name} value={value?.value} onValueChange={handleChange}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                        {items.map((item) => (
                            <SelectItem key={item?.value} value={item?.value || ''}>
                                {item?.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {errors && (
                    <div className='text-red-500 mt-1 block'>
                        {errors.map((error, index) => (      
                            <div key={index}>{error}</div>
                        ))}
                    </div>
                )} 
            </div>
        </div>
    )
}

export default InputSelect