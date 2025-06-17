import { AnyElement} from "@/types/Item"
import { createSlice, PayloadAction } from '@reduxjs/toolkit'



export interface ItemsStateFilters{
  quality: number[]
  pool: string[]
  tag: string[]
}

interface ItemsState {
  items: AnyElement[];
  trinkets: AnyElement[];
  consumables: AnyElement[];
  filters: ItemsStateFilters
  searchString: string
}

const initialState: ItemsState = {
  items: [],
  trinkets: [],
  consumables: [],
  filters: {
    quality: [],
    pool: [],
    tag: [],
  },
  searchString: ""
}

export const itemsSlice = createSlice({
    name: "items",
    initialState,
    reducers: {
        setItems: (state, action: PayloadAction<AnyElement[]>) => {
            state.items = action.payload;
        },
        setTrinkets: (state, action: PayloadAction<AnyElement[]>) => {
            state.trinkets = action.payload;
        },
        setConsumables: (state, action: PayloadAction<AnyElement[]>) => {
            state.consumables = action.payload;
        },
        setFilterData: (state, action: PayloadAction<ItemsStateFilters>) => {
            state.filters = action.payload;
        },
        setPoolFilter: (state, action: PayloadAction<string[]>) => {
            state.filters.pool = action.payload;
        },
        setSearchString: (state, action: PayloadAction<string>) => {
            state.searchString = action.payload;
        },
    },
});

export const { setItems, setTrinkets, setConsumables, setFilterData, setPoolFilter, setSearchString} = itemsSlice.actions

export default itemsSlice.reducer

