import { createSlice } from '@reduxjs/toolkit'


export const clickTilesBlockerSlice = createSlice({
    name: 'clickTilesBlocker',
    initialState: {
        value: false,
    },
    reducers: {
        lock: (state) => {
            state.value = true
        },
        unlock: (state) => {
            state.value = false
        }
    },
})

export const {lock, unlock} = clickTilesBlockerSlice.actions

export const selectBlockerValue = (state: { clickTilesBlocker: { value: boolean } }) => {
    return state.clickTilesBlocker.value
};

export default clickTilesBlockerSlice.reducer


