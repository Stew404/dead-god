import { useAppDispatch, useAppSelector } from "@/hooks"
import { ItemsStateFilters, setFilterData } from "@/redux/slices/itemsSlice"

type FilterValue = string | number

export interface FilterUpdatePayload {
    value: FilterValue,
    key: string,
    checked: boolean
}

export const useFilter = ()=>{

    const dispatch = useAppDispatch()

    let filters = useAppSelector(state => state.items.filters)

    const onFiltersChange = (filter: FilterUpdatePayload)=>{
        const currentOldFilter: FilterValue[] = filters[filter.key as keyof ItemsStateFilters];

        let currentNewFilter: FilterValue[]
        if(filter.checked){
            currentNewFilter = currentOldFilter ? [...currentOldFilter, filter.value] : [filter.value]
        } else {
            currentNewFilter = currentOldFilter?.filter(elem => elem != filter.value)
        }

        const newFilters = {
            ...filters,
            [filter.key]: currentNewFilter
        }
        dispatch(setFilterData(newFilters))
    }

    return onFiltersChange
}