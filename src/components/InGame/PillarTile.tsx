import { OBJModel } from "../Helpers/OBJModel";
import { ResourcesPaths } from "../../configs/resources";
import { PropsWithChildren } from "react";

export type PlatformPillarItemProps = { opacity?: number } & PropsWithChildren
const defaultPlatformPillarItemProps = {opacity: 1};

export function PillarTile(props: PlatformPillarItemProps = defaultPlatformPillarItemProps) {
    return (
        <group>
            <OBJModel path={ResourcesPaths.platform1} opacity={props.opacity} transparent/>
        </group>
    )
}