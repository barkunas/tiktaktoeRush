import { PlatformPillarItem } from "./PlatformPillarItem";
import { globalOffset, ModelPositionType } from "./Platforms";
import { ItemType } from "./ItemType";
import { useState } from "react";
import { ThreeEvent } from "@react-three/fiber";
import { GameElement } from "./GameElement";

export type PlatformPillarProps = {
    pillarModel: ItemType[]
    positionX: number,
    positionY: number,
    updateModel3D: (position: ModelPositionType) => void,
    positionInModel: ModelPositionType
}

const defaultOpacity = 0.5;
const hoverOpacity = 1;

export function PlatformPillar(props: PlatformPillarProps) {
    const [opacity, setOpacity] = useState(defaultOpacity)
    const platformOnPointerEnterHandler = (e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation()
        setOpacity(hoverOpacity)
    }
    const platformOnPointerLeaveHandler = (e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation()
        setOpacity(defaultOpacity)
    }
    const onclickHandler = (e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        props.updateModel3D(props.positionInModel)

    }
    const pillars = props.pillarModel.map((it, index) => {
        return (
            <group
                onPointerEnter={platformOnPointerEnterHandler}
                onPointerLeave={platformOnPointerLeaveHandler}
                onClick={onclickHandler}
                position={[props.positionX, index * globalOffset, props.positionY]}
                key={index}>
                {it !== ItemType.Empty && <GameElement elementType={it}/>}
                <PlatformPillarItem opacity={opacity}/>
            </group>
        )
    })
    return (
        <group>
            {pillars}
        </group>
    )
}