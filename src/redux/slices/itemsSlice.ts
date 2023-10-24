import { Item, Quality } from "@/types/Item"
import { createSlice, PayloadAction } from '@reduxjs/toolkit'



export interface ItemsStateFilters{
  quality?: Quality[]
}

interface ItemsState {
  items: Item[];
  filters: ItemsStateFilters
}

const initialState: ItemsState = {
  items: [],
  filters: {
    quality: []
  }
}

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<Item[]>)=>{
        state.items = action.payload
    },
    setFilterData: (state, action: PayloadAction<ItemsStateFilters>)=>{
        state.filters = action.payload
    }
  },
})

export const { reducer: itemsReducer, actions: itemActions } = itemsSlice

