export enum ItemType {
    Empty,
    Circle,
    Cross,
    GreenBox,
    BlueBox,
    PinkBox,
    Stone_0
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

    private _type: ItemType

    public get type() {
        return this._type
    }

    private _isWillUnmount = false;
    get isWillUnmount() {
        return this._isWillUnmount
    }

    private _key: number
    public get key() {
        return this._key
    }

    constructor(isEmpty = false) {
        this._type = isEmpty ? ItemType.Empty : Item.getRandomAItemType();
        this._key = Item.increment()
    }

    public willUnmount() {
        this._isWillUnmount = true;
    }

    public clone() {
        const _this = new Item();
        _this._type = this.type;
        _this._key = this.key;
        _this._isWillUnmount = this.isWillUnmount;
        return _this
    }

    toJSON() {
        return `{
            "key":${this.key},
            "type":${this.type},
            "isWillUnmount":${this.isWillUnmount},
            "_key":${this._key},
            "_type":${this._type},
            "_isWillUnmount":${this._isWillUnmount},
        }`
    }
}