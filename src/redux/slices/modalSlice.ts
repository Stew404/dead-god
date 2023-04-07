import { createSlice } from '@reduxjs/toolkit'

interface modalState {
    value: boolean
}

const initialState: modalState = {
    value: false
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    open: (state)=>{
        state.value = true
    },
    close: (state)=>{
        state.value = false
    },
    change: (state)=>{
        state.value = !state.value
    }
  },
})

export const { open, close, change } = modalSlice.actions

export default modalSlice.reducer