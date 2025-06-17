import { configureStore } from "@reduxjs/toolkit";
import navMenuItemsReducer from "./slices/navMenuItemsSlice"
import itemsReducer from "./slices/itemsSlice"
import hoveredItemReducer from "./slices/hoveredItemSlice"
import modalReducer from "./slices/modalSlice"
import modalItemReducer from "./slices/modalItemSlice"
import settingsReducer from "./slices/settingsSlice"
import poolsReducer from "./slices/poolsSlice"
import tagsReducer from "./slices/tagsSlice"
import transformationsReducer from "./slices/transformationsSlice"

const store = configureStore({
    reducer:{
        navMenuItems: navMenuItemsReducer,
        items: itemsReducer,
        hoveredItem: hoveredItemReducer,
        modal: modalReducer,
        modalItem: modalItemReducer,
        settings: settingsReducer,
        pools: poolsReducer,
        tags: tagsReducer,
        transformations: transformationsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store