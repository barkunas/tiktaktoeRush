import { createSlice } from '@reduxjs/toolkit'

export enum Pages {
    Menu,
    InGame
}

export const pageSlice = createSlice({
    name: 'page',
    initialState: {
        value: Pages.Menu,
    },
    reducers: {
        toMenu: (state) => {
            state.value = Pages.Menu
        },
        toInGame: (state) => {
            state.value = Pages.InGame
        }
    },
})

export const {toMenu, toInGame} = pageSlice.actions

export const selectPage = (state: { page: { value: number } }) => {
    return state.page
};

export default pageSlice.reducer
