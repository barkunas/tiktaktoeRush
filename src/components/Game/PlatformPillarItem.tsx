import { ThreeEvent } from "@react-three/fiber";
import { OBJModel } from "../Helpers/OBJModel";
import { ResourcesPaths } from "../../configs/resources";
import { PropsWithChildren } from "react";

export type PlatformPillarItemProps = { opacity?: number } & PropsWithChildren
const defaultPlatformPillarItemProps = {opacity: 1};

export function PlatformPillarItem(props: PlatformPillarItemProps = defaultPlatformPillarItemProps) {
    let onclickHandler = (e: ThreeEvent<MouseEvent>) => {

    };
    return (
        <group onClick={onclickHandler}>
            <OBJModel path={ResourcesPaths.platform1} opacity={props.opacity} transparent/>
        </group>
    )
}