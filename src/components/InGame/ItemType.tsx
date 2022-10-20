export enum ItemType {
    Empty,
    Circle,
    Cross,
    GreenBox,
    BlueBox,
    PinkBox
}

export type ItemObjectType = {
    type: ItemType,
    key: number,
    isWillUnmount?: boolean
}

export class ItemsCounter {
    private static value = 0;

    public static increment() {
        return ItemsCounter.value += 1
    }
}