import { createSlice } from '@reduxjs/toolkit'

export const modal = createSlice({
  name: 'modal',
  initialState: {
    value: false
  },
  reducers: {
    open: state => {
      state.value = true
    },
    close: state => {
      state.value = false
    }, 
    change: state => {
      state.value = !state.value
    }
  }
})

export const { open, close, change } = modal.actions

export default modal.reducer