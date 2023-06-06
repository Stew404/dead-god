import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SettingsSliceState {
  value: boolean
}

const initialState: SettingsSliceState = {
  value: false,
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggle: (state) => {state.value = !state.value}
  },
})

export const { toggle } = settingsSlice.actions

export default settingsSlice.reducer