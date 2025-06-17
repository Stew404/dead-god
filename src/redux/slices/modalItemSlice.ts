import { AnyElement, Item } from "@/types/Item";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface modalItemState {
    value: AnyElement;
}

const initialState: modalItemState = {
    value: {} as AnyElement,
};

export const modalItemSlice = createSlice({
    name: "modalItem",
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

export const { set, clear } = modalItemSlice.actions;

export default modalItemSlice.reducer;
