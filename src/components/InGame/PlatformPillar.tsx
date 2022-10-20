import { ModelPositionType } from "./Platforms";
import React from "react";
import { PlatformTiles } from "./PlatformTiles";
import { PillarGameElements } from "./PillarGameElements";

export type PlatformPillarProps = {
    positionInModel: ModelPositionType
}

export function PlatformPillar(props: PlatformPillarProps) {
    return (
        <group>
            <PlatformTiles positionInModel={props.positionInModel}/>
            <PillarGameElements positionInModel={props.positionInModel}/>
        </group>
    )
}

