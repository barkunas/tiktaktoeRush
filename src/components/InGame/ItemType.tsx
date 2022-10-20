export enum ItemType {
    Empty,
    Circle,
    Cross,
    GreenBox,
    BlueBox,
    PinkBox,
    Stone_0
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

export class Item {

    private static value = 0;

    public static increment() {
        return Item.value += 1
    }

    private static getRandomAItemType() {
        //return 3
        const min = ItemType.GreenBox;
        const max = ItemType.PinkBox;
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    private readonly _type: ItemType

    public get type() {
        return this._type
    }

    private _isWillUnmount = false;
    get isWillUnmount() {
        return this._isWillUnmount
    }

    public readonly key: number

    constructor(isEmpty = false) {
        this._type = isEmpty ? ItemType.Empty : Item.getRandomAItemType();
        this.key = Item.increment()
    }

    public willUnmount() {
        this._isWillUnmount = true;
    }
}