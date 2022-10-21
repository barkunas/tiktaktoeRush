import React, { useEffect, useRef } from "react";
import { Group, Vector3 } from "three";
import { useSelector } from "react-redux";
import { selectCount } from "../../redux/GameCounterReducer";
import { Text } from "@react-three/drei";
import { OBJModel } from "../Helpers/OBJModel";
import { ResourcesUI } from "../../configs/resources";
import { useThree } from "@react-three/fiber";
import { selectFirst, selectQueue } from "../../redux/ItemsQueueReducer";
import { getPath } from "../Helpers/GetPath";
import { useSpring, animated } from "@react-spring/three";

export function BottomPanel() {
    const {size} = useThree()
    const nextItem = useSelector(selectFirst);
    let animationConfig: {
        from?: { position: number[] },
        to?: { position: number[] },
        reset?: boolean
    } = {
        from: {position: [100, 0, 0]},
        to: {position: [0, 0, 0]},
        reset: true
    };
    const springProps = useSpring(animationConfig);
    return (
        <group position={[0, 0, 0]}>
            <group position={[size.width / 2, -size.height / 2, -100]}
                   scale={[size.height / 2, size.height / 2, size.height / 2]}>
                <group
                    rotation={[0.3, -0.3, 0]}
                    scale={[0.2, 0.2, 0.2]}
                    position={[-0.5, 0, 0]}
                >

                    <Text position={[1, 0.7, 1]} fontSize={0.7}>next</Text>
                    <animated.group {...springProps}>
                        <OBJModel scale={0.3} path={getPath(nextItem.element.type)}/>
                    </animated.group>
                </group>
            </group>
        </group>
    )
}