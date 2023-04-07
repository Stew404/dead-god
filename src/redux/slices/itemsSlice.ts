import { Item } from "@/types/Item"
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ItemsState {
  value: Item[];
}

const initialState: ItemsState = {
  value: [],
}

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Item[]>)=>{
        state.value = action.payload
    }
  },
})

export const { set } = itemsSlice.actions

export default itemsSlice.reducer