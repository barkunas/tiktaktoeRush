export enum ItemType {
    Empty,
    Circle,
    Cross
}

export enum ItemStatus {
    New,
    Old
}

export type ItemObjectType = {
    type: ItemType,
    status: ItemStatus
}