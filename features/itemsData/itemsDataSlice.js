import { createSlice } from '@reduxjs/toolkit'

export const itemsData = createSlice({
  name: 'itemsData',
  initialState: {
    value: {}
  },
  reducers: {
    set: (state, action) => {
      state.value = action.payload
    },
  }
})

export const { set } = itemsData.actions

export default itemsData.reducer