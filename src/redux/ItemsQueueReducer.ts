import { createSlice, Draft } from '@reduxjs/toolkit';
import { Item } from "../components/InGame/ItemType";

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
    name: 'itemsQueue',
    initialState: {
        value: initialItemsQueue,
    },
    reducers: {
        dequeue: (state: Draft<{ value: ItemsQueueType }>) => {
            const last = findLastIndex(state.value, it => it.isDequeue)
            state.value[last + 1].isDequeue = true;
            state.value.push({element: new Item(), isDequeue: false})
        },
    },
})

export const {dequeue} = itemsQueueSlice.actions

export const selectQueue = (state: { itemsQueue: { value: ItemsQueueType } }) => {
    return state.itemsQueue;
};

export const selectFirst = (state: { itemsQueue: { value: ItemsQueueType } }) => {
    return state.itemsQueue.value[findLastIndex(state.itemsQueue.value, it => it.isDequeue)+1]
};

export default itemsQueueSlice.reducer

export function findLastIndex<T>(array: Array<T>, predicate: (value: T, index: number, obj: T[]) => boolean): number {
    let l = array.length;
    while (l--) {
        if (predicate(array[l], l, array))
            return l;
    }
    return -1;
}