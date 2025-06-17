import { Tag } from '@/types/Item'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface tagsState {
  value: Tag[]
}

const initialState: tagsState = {
  value: [],
}

export const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Tag[]>)=>{
        state.value = action.payload
    }
  },
})

export const { set } = tagsSlice.actions

export default tagsSlice.reducer