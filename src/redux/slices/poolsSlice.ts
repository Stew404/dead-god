import { Pool } from '@/types/Item'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface poolsState {
  value: Pool[]
}

const initialState: poolsState = {
  value: [],
}

export const poolsSlice = createSlice({
  name: 'pools',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Pool[]>)=>{
        state.value = action.payload
    }
  },
})

export const { set } = poolsSlice.actions

export default poolsSlice.reducer