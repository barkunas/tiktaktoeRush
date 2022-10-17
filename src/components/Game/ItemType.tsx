export enum ItemType {
    Empty,
    Circle,
    Cross,
    GreenBox,
    BlueBox,
    PinkBox
}

export enum ItemStatus {
    New,
    Old
}

export type ItemObjectType = {
    type: ItemType,
    status: ItemStatus
}