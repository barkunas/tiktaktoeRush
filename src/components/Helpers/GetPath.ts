import { ItemType } from "../InGame/ItemType";
import { ResourcesPaths } from "../../configs/resources";

export function getPath(type: ItemType): string {
    let path = ResourcesPaths.point1;
    switch (type) {
        case ItemType.Circle:
            path = ResourcesPaths.point1;
            break;
        case ItemType.Cross:
            path = ResourcesPaths.point2;
            break;
        case ItemType.GreenBox:
            path = ResourcesPaths.point3;
            break;
        case ItemType.BlueBox:
            path = ResourcesPaths.point4;
            break;
        case ItemType.PinkBox:
            path = ResourcesPaths.point5;
            break;
        case ItemType.Stone_0:
            path = ResourcesPaths.point6;
            break;
        default:
            return path
    }
    return path
}