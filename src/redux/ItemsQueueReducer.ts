import { createSlice } from '@reduxjs/toolkit';
import { Item, ItemsCounter, ItemType } from "../components/InGame/ItemType";
import { Model3DType } from "../components/InGame/Platforms";

export type ItemInQueueType = {
    element: Item,
    isDequeue: boolean
}
export type ItemsQueueType = ItemInQueueType[];

export const initialItemsQueue: ItemsQueueType = [];

export const initialItemsQueueSize = 4;

for (let i = 0; i < initialItemsQueueSize; i++) {
    initialItemsQueue.push({element: new Item(), isDequeue: false})
}

export const itemsQueueSlice = createSlice({
    name: 'queue',
    initialState: {
        value: initialItemsQueue,
    },
    reducers: {
        dequeue: (state, action) => {
            state.value[0].isDequeue = true;
            state.value.push({element: new Item(), isDequeue: false})
        },
    },
})

export const {dequeue} = itemsQueueSlice.actions

export const selectQueue = (state: { queue: { value: ItemsQueueType } }) => {
    return state.queue
};

export default itemsQueueSlice.reducer
