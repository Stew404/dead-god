import { Transformation } from '@/types/Item'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface transformationsState {
  value: Transformation[]
}

const initialState: transformationsState = {
  value: [],
}

export const transformationsSlice = createSlice({
  name: 'transformation',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Transformation[]>)=>{
        state.value = action.payload
    }
  },
})

export const { set } = transformationsSlice.actions

export default transformationsSlice.reducer