import { createSlice } from '@reduxjs/toolkit'

export const hoveredItemSlice = createSlice({
  name: 'hoveredItem',
  initialState: {
    value: {}
  },
  reducers: {
    set: (state, action) => {
      state.value = action.payload
    },
    clear: state => {
      state.value = {}
    }
  }
})

export const { set, clear } = hoveredItemSlice.actions

export default hoveredItemSlice.reducer