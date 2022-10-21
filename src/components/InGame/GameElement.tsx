import { OBJModel } from "../Helpers/OBJModel";
import { Item, ItemType } from "./ItemType";
import React, { useEffect, useRef } from "react";
import { animated, useSpring } from "@react-spring/three";
import { Vector3 } from "three";
import { getPath } from "../Helpers/GetPath";

type GameElementProps = {
    elementType: Item,
    isShowing: boolean,
    positionY: number
}

export function GameElement(props: GameElementProps) {
    const prevType = usePrevious(props.positionY) || ItemType.Empty;
    const prevPosition = usePrevious(props.positionY) || 0;
    let animationConfig: {
        from?: { position: number[] },
        to?: { position: number[] }
    } = {
        from: {position: [0, prevPosition, 0]},
        to: {position: [0, props.positionY, 0]}
    };
    if (props.elementType.isWillUnmount) {
        //Unmount
        animationConfig = {
            from: {position: [0, props.positionY, 0]},
            to: {position: [0, -20, 0]}
        }
    } else if (prevType === ItemType.Empty && props.elementType.type !== ItemType.Empty) {
        //First appears
        animationConfig = {
            from: {position: [0, 20, 0]},
            to: {position: [0, props.positionY, 0]}
        }
    } else if (prevPosition !== props.positionY && props.elementType.type !== ItemType.Empty) {
        //Drop down
        animationConfig = {
            from: {position: [0, prevPosition, 0]},
            to: {position: [0, props.positionY, 0]}
        }
    }
    const springProps = useSpring(animationConfig)
    return props.isShowing ?
        <animated.group {...springProps}>
            <OBJModel
                position={new Vector3(0, 0, 0)}
                path={getPath(props.elementType.type)}/>
        </animated.group>
        : null
}

function usePrevious<T>(value: T) {
    const ref = useRef<T>();
    useEffect(() => {
        ref.current = value;
    }, [value]);
    return ref.current;
}