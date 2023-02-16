import { createSlice } from '@reduxjs/toolkit'

export const selectedItemSlice = createSlice({
  name: 'selectedItem',
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

export const { set, clear } = selectedItemSlice.actions

export default selectedItemSlice.reducer