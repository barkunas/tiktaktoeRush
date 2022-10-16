import { PlatformPillarItem } from "./PlatformPillarItem";
import { globalOffset } from "./Platforms";
import { ItemType } from "./ItemType";
import { useState } from "react";
import { ThreeEvent } from "@react-three/fiber";

export type PlatformPillarProps = {
    pillarModel: ItemType[]
    positionX: number,
    positionY: number
}

const defaultOpacity = 0.5;
const hoverOpacity = 1

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
    const pillars = props.pillarModel.map((it, index) => {
        return (
            <group
                onPointerEnter={platformOnPointerEnterHandler}
                onPointerLeave={platformOnPointerLeaveHandler}
                position={[props.positionX, index * globalOffset, props.positionY]}
                key={index}>
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