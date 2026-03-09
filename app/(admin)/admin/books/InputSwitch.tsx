import InputSelect from "@/components/InputSelect";
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useState } from "react";

type Item = {value: string; label: string}

type InputSwitchProps = {
  filterItems: Item[]
  selectedValue: Item | null
}

export default function InputSwitch({filterItems, selectedValue}: InputSwitchProps) {
  const [showFields, setShowFields] = useState(selectedValue ? true : false);

  return (
    <>
        <div className="flex items-center space-x-2">
            <Switch id="input-kids" onClick={() => setShowFields(!showFields)} />
            <Label htmlFor="input-kids" className="font-bold text-lg">Filters For kids</Label>
        </div>

        {showFields && <InputSelect 
          name="filter" 
          label="Filters" 
          items={filterItems} 
          placeholder="Choose filter"
          selectedValue={selectedValue}
         />}
    </>
  )
}
