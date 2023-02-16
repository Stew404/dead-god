import { configureStore } from '@reduxjs/toolkit'
import hoveredItemReducer from "../features/hoveredItem/hoveredItemSlice"
import selectedItemReducer from "../features/selectedItem/selectedItemSlice"
import modalReducer from "../features/modal/modalSlice"
import itemsDataReducer from "../features/itemsData/itemsDataSlice"

export default configureStore({
  reducer: {
    hoveredItem: hoveredItemReducer,
    selectedItem: selectedItemReducer,
    modal: modalReducer,
    itemsData: itemsDataReducer
  }
})