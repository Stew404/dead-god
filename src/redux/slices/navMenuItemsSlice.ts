import { MenuItems } from '@/types/NavMenu'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface NavMenuItemsState {
  value: MenuItems
}

const initialState: NavMenuItemsState = {
  value: [],
}

export const navMenuItemsSlice = createSlice({
  name: 'navMenuItems',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<MenuItems>)=>{
        state.value = action.payload
    }
  },
})

export const { set } = navMenuItemsSlice.actions

export default navMenuItemsSlice.reducer