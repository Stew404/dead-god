import { useState, useEffect } from "react"
import { useAppDispatch } from "@/hooks"
import { ItemsStateFilters, itemActions } from "@/redux/slices/itemsSlice"

interface FilterUpdatePayload {
    value: string | number,
    key: string,
    checked: boolean
}

export const useFilter = ()=>{

    const dispatch = useAppDispatch()

    const [filters, setFilters] = useState<ItemsStateFilters>({})

    useEffect(()=>{
        dispatch(itemActions.setFilterData(filters))
    }, [filters])

    const onFiltersChange = (filter: FilterUpdatePayload)=>{
  
        setFilters((oldFilters) => {
            const oldFilter = oldFilters[filter.key as keyof ItemsStateFilters];

            let newFilter
            if(filter.checked){
                newFilter = oldFilter ? [...oldFilter, filter.value] : [filter.value]
            } else {
                    newFilter = oldFilter?.filter(elem => elem != filter.value)
            }
            return {
                ...oldFilters,
                [filter.key]: newFilter
            }
        })
        
    }

    return onFiltersChange
}