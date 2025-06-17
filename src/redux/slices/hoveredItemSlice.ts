import { AnyElement} from "@/types/Item"
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface hoveredItemState {
  value: AnyElement;
}

const initialState: hoveredItemState = {
    value: {} as AnyElement,
};

export const hoveredItemSlice = createSlice({
    name: "hoveredItem",
    initialState,
    reducers: {
        set: (state, action: PayloadAction<AnyElement>) => {
            state.value = action.payload;
        },
        clear: (state) => {
            state.value = {} as AnyElement;
        },
    },
});

export const { set, clear } = hoveredItemSlice.actions

export default hoveredItemSlice.reducer