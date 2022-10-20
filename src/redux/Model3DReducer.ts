import { createSlice } from '@reduxjs/toolkit';
import { ItemsCounter, ItemType } from "../components/InGame/ItemType";
import { Model3DType } from "../components/InGame/Platforms";

export const initialModel3D: Model3DType = [[[], [], []], [[], [], []], [[], [], []]];

initialModel3D.forEach(k => {
    k.forEach(t => {
        for (let i = 0; i < 3; i++) {
            t.push({
                type: ItemType.Empty,
                key: ItemsCounter.increment()
            })
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
            state.value = [...(action.payload)]
        },
    },
})

export const {setModel} = model3DSlice.actions

export const selectModel = (state: { model: { value: Model3DType } }) => {
    return state.model
};

export default model3DSlice.reducer