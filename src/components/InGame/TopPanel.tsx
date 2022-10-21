import React, { useRef } from "react";
import { Group } from "three";
import { useSelector } from "react-redux";
import { selectCount } from "../../redux/GameCounterReducer";
import { Text } from "@react-three/drei";
import { OBJModel } from "../Helpers/OBJModel";
import { ResourcesUI } from "../../configs/resources";
import { useThree } from "@react-three/fiber";

export function TopPanel() {
    const {size} = useThree()
    const counter = useSelector(selectCount);
    return (
        <group position={[0, 0, 0]}>
            <group position={[size.width / 2, size.height / 2, -100]}
                   scale={[size.height / 2, size.height / 2, size.height / 2]}>
                <group
                    rotation={[0.3, -0.3, 0]}
                    scale={[0.2, 0.2, 0.2]}
                    position={[-0.5, -0.5, 0]}
                >
                    <Text position={[0.75, 1.8, 1]} fontSize={0.7}>{counter.value}</Text>
                    <OBJModel path={ResourcesUI.pinkBlock}/>
                </group>
            </group>
        </group>
    )
}