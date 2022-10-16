import { OBJModel } from "../Helpers/OBJModel";
import { ResourcesPaths } from "../../configs/resources";
import { useRef, useState } from "react";
import { ItemType } from "./ItemType";
import { ModelPositionType } from "./Platforms";

type GameElementProps = {
    elementType: ItemType,
}

const enum GameElementSate {
    Empty,
    Fall,
    Static
}

export function GameElement(props: GameElementProps) {
    const [status, seStatus] = useState(GameElementSate.Static);
    const elementRef = useRef(null!);
    let path = ResourcesPaths.point1;
    switch (props.elementType) {
        case ItemType.Circle:
            path = ResourcesPaths.point1;
            break;
        case ItemType.Cross:
            path = ResourcesPaths.point2;
            break;
        default:
            return null
    }
    return (
        <OBJModel ref={elementRef} path={path}/>
    )
}