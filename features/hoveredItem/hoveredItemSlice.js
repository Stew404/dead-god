import { createSlice } from '@reduxjs/toolkit'

export const hoveredItemSlice = createSlice({
  name: 'hoveredItem',
  initialState: {
    value: {}
  },
  reducers: {
    add: (state, action) => {
      state.value = action.payload
    },
    clear: state => {
      state.value = {}
    }
  }
})

export const { add, clear } = hoveredItemSlice.actions

export default hoveredItemSlice.reducer