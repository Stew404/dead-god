import { Item } from "@/types/Item"
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ItemOrEmpty } from "../../types/Item";

interface hoveredItemState {
  value: ItemOrEmpty;
}

const initialState: hoveredItemState = {
  value: {},
}

export const hoveredItemSlice = createSlice({
  name: 'hoveredItem',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Item>)=>{
        state.value = action.payload
    },
    clear: (state)=>{
        state.value = {}
    }
  },
})

export const { set, clear } = hoveredItemSlice.actions

export default hoveredItemSlice.reducer