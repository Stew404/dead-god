import { Item } from "@/types/Item"
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ItemOrEmpty } from "../../types/Item";

interface modalItemState {
  value: ItemOrEmpty;
}

const initialState: modalItemState = {
  value: {},
}

export const modalItemSlice = createSlice({
  name: 'modalItem',
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

export const { set, clear } = modalItemSlice.actions

export default modalItemSlice.reducer