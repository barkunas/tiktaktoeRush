import { OBJModel } from "../Helpers/OBJModel";
import { ResourcesPaths } from "../../configs/resources";
import { ItemObjectType, ItemType } from "./ItemType";
import { useEffect, useRef } from "react";
import { animated, useSpring } from "@react-spring/three";

type GameElementProps = {
    elementType: ItemObjectType,
    isShowing: boolean,
    positionY: number
}

function getPath(type: ItemType): string {
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
        default:
            return path
    }
    return path
}

export function GameElement(_props: GameElementProps) {
    const prevType = usePrevious(_props.positionY) || ItemType.Empty;
    const prevPosition = usePrevious(_props.positionY);
    const prevPositionNormalize = prevPosition || 0
    let animationConfig: {
        from?: { position: number[] },
        to?: { position: number[] }
    } = {
        from: {position: [0, prevPositionNormalize, 0]},
        to: {position: [0, _props.positionY, 0]}
    };
    if (_props.elementType.key === 28) {
        console.log("<<<<<Element>>>>>")
        console.log(`prevType: ${prevType}, prevPos: ${prevPosition} `)
        console.log(_props.elementType.key)
        console.log(_props.elementType.type)
        console.log(_props.positionY)
    }
    if (_props.elementType.isWillUnmount) {
        //Unmount
        console.log("==Unmount==" + _props.elementType.key)
        console.log("PrevType: " + prevType)
        console.log("CurrType: " + _props.elementType.type)
        console.log("PrevPos: " + prevPosition)
        console.log("CurrPos: " + _props.positionY)
        animationConfig = {
            from: {position: [0, _props.positionY, 0]},
            to: {position: [0, -20, 0]}
        }
    } else if (prevType === ItemType.Empty && _props.elementType.type !== ItemType.Empty) {
        //First appears
        console.log("==First appears==" + _props.elementType.key)
        console.log("Prev: " + prevPosition)
        console.log("Curr: " + _props.positionY)
        animationConfig = {
            from: {position: [0, 20, 0]},
            to: {position: [0, _props.positionY, 0]}
        }
    } else if (prevPositionNormalize !== _props.positionY && _props.elementType.type !== ItemType.Empty) {
        //drop down
        console.log("==Y==" + _props.elementType.key)
        console.log("Prev: " + prevPosition)
        console.log("Curr: " + _props.positionY)
        animationConfig = {
            from: {position: [0, prevPositionNormalize, 0]},
            to: {position: [0, _props.positionY, 0]}
        }
    }

    const {position} = useSpring(animationConfig)
    return _props.isShowing ?
        <animated.group position={position}>
            <OBJModel
                path={getPath(_props.elementType.type)}/>
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