import { OBJModel } from "../Helpers/OBJModel";
import { ResourcesPaths } from "../../configs/resources";
import { useEffect, useRef, useState } from "react";
import { ItemObjectType, ItemType } from "./ItemType";
import { Group, Mesh, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";

type GameElementProps = {
    elementType: ItemObjectType,
}

const enum GameElementSate {
    Empty,
    Fall,
    Static
}

export function GameElement(props: GameElementProps) {
    const [status, seStatus] = useState(GameElementSate.Fall);
    const elementRef = useRef<Mesh>(null!);
    useFrame(() => {
        if (status === GameElementSate.Fall) {
            elementRef.current.position.lerp(new Vector3(0, 0, 0), 0.1)
            //seStatus(GameElementSate.Static)
        }
    })
    //elementRef.current.position.lerp()
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
        <OBJModel ref={elementRef} position={new Vector3(0, 10, 0)} path={path}/>
    )
}