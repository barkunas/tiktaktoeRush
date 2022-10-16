import { OBJModel } from "../Helpers/OBJModel";
import { ResourcesPaths } from "../../configs/resources";
import { useEffect, useRef, useState } from "react";
import { ItemObjectType, ItemStatus, ItemType } from "./ItemType";
import { Mesh, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";

type GameElementProps = {
    elementType: ItemObjectType,
}

const enum GameElementSate {
    Fall,
    Static
}

const statusToStartPosition = new Map([
    [ItemStatus.New, new Vector3(0, 10, 0)],
    [ItemStatus.Old, new Vector3(0, 4, 0)],
])

export function GameElement(props: GameElementProps) {
    const [status, seStatus] = useState(GameElementSate.Fall);
    const elementRef = useRef<Mesh>(null!);
    useFrame((a, b) => {
        if (status === GameElementSate.Fall || props.elementType.status === ItemStatus.Old) {
            elementRef.current.position.lerp(new Vector3(0, 0, 0), 0.1)
        }
    })
    useEffect(() => {
        setTimeout(() => {
            seStatus(GameElementSate.Static)
        }, 1000)
    })
    let path = ResourcesPaths.point1;
    switch (props.elementType.type) {
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
        <OBJModel ref={elementRef} position={statusToStartPosition.get(props.elementType.status)} path={path}/>
    )
}