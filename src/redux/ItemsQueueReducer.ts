
import { createSlice } from '@reduxjs/toolkit';
import { ItemObjectType, ItemsCounter, ItemType } from "../components/InGame/ItemType";
import { Model3DType } from "../components/InGame/Platforms";

export type ItemInQueueType = {
    element: ItemObjectType
}
export type ItemsQueueType = ItemInQueueType[];

export const initialItemsQueue: ItemsQueueType = [];

export const initialItemsQueueSize = 4;

for (let i = 0; i < initialItemsQueueSize; i++) {

}

/*export const model3DSlice = createSlice({
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

export default model3DSlice.reducer*/
