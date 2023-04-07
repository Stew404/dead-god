import { configureStore } from "@reduxjs/toolkit";
import navMenuItemsReducer from "./slices/navMenuItemsSlice"
import itemsReducer from "./slices/itemsSlice"
import hoveredItemReducer from "./slices/hoveredItemSlice"
import modalReducer from "./slices/modalSlice"
import modalItemReducer from "./slices/modalItemSlice"

const store = configureStore({
    reducer:{
        navMenuItems: navMenuItemsReducer,
        items: itemsReducer,
        hoveredItem: hoveredItemReducer,
        modal: modalReducer,
        modalItem: modalItemReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store