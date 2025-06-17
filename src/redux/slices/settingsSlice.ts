import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SettingsSliceState {
  isShowed: boolean,
  groupType: string,
  hideType: string,
  sortType: string,
  namesLanguage: string,
  isGreedModeEnabled: boolean
}

const initialState: SettingsSliceState = {
  isShowed: false,
  groupType: "category",
  hideType: "fade",
  sortType: "id",
  namesLanguage: "en",
  isGreedModeEnabled: false
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleShowing: (state) => {state.isShowed = !state.isShowed},
    setGreedMode: (state, action: PayloadAction<boolean>) => {state.isGreedModeEnabled = action.payload},
    setGroupType: (state, action: PayloadAction<string>) => {state.groupType = action.payload},
    setHideType: (state, action: PayloadAction<string>) => {state.hideType = action.payload},
    setSortType: (state, action: PayloadAction<string>) => {state.sortType = action.payload},
    setNamesLanguage: (state, action: PayloadAction<string>) => {state.namesLanguage = action.payload}
  },
})

export const { toggleShowing, setGreedMode, setGroupType, setHideType, setSortType, setNamesLanguage } = settingsSlice.actions

export default settingsSlice.reducer