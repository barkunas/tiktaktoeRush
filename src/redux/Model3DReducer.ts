import { createSlice } from '@reduxjs/toolkit';
import { Item } from "../components/InGame/ItemType";
import { Model3DType } from "../components/InGame/Platforms";
import { CloneModel3DType } from "../components/Helpers/CloneModel3DType";

export const initialModel3D: Model3DType = [[[], [], []], [[], [], []], [[], [], []]];

initialModel3D.forEach(k => {
    k.forEach(t => {
        for (let i = 0; i < 3; i++) {
            t.push(new Item(true))
        }
    })
})

export const model3DSlice = createSlice({
    name: 'model',
    initialState: {
        value: initialModel3D,
    },
    reducers: {
        setModel: (state, action) => {
            state.value = CloneModel3DType(action.payload)
        },
    },
})

export const {setModel} = model3DSlice.actions

export const selectModel = (state: { model: { value: Model3DType } }) => {
    return state.model
};

export default model3DSlice.reducer