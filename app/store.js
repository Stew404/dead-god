import { configureStore } from '@reduxjs/toolkit'
import hoveredItemReducer from "../features/hoveredItem/hoveredItemSlice"

export default configureStore({
  reducer: {
    hoveredItem: hoveredItemReducer
  }
})