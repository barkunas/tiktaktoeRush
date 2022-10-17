import { createPortal, useFrame, useThree } from "@react-three/fiber";
import React, { useMemo, useRef } from "react";
import { Group, Scene as ThreeScene } from "three";
import { OrthographicCamera, Text } from "@react-three/drei";
import { OBJModel } from "../Helpers/OBJModel";
import { ResourcesUI } from "../../configs/resources";

export function GameUI() {
    const {gl, scene, camera, size} = useThree()
    const virtualScene = useMemo(() => new ThreeScene(), [])
    const virtualCam = useRef(null!)
    const tempRef = useRef<Group>(null!)
    console.log(tempRef.current)

    useFrame(() => {
        gl.autoClear = true
        gl.render(scene, camera)
        gl.autoClear = false
        gl.clearDepth()
        gl.render(virtualScene, virtualCam.current)
    }, 1)

    return createPortal(
        <>
            <OrthographicCamera left={-size.width / 2}
                                right={size.width / 2}
                                top={size.height / 2}
                                bottom={-size.height / 2}
                                near={-1000}
                                far={1000}
                                ref={virtualCam}
                                makeDefault={false}
                                position={[0, 0, 10]}/>
            <group ref={tempRef} position={[0, 0, 0]}>
                <group position={[size.width / 2, size.height / 2, -100]}
                       scale={[size.height / 2, size.height / 2, size.height / 2]}>
                    <group
                        rotation={[0.3, -0.3, 0]}
                        scale={[0.2, 0.2, 0.2]}
                        position={[-0.5, -0.5, 0]}
                    >
                        <Text position={[0.75, 1.8, 1]} fontSize={0.7}>22</Text>
                        <OBJModel path={ResourcesUI.pinkBlock}/>
                    </group>
                </group>
            </group>
            <ambientLight intensity={0.5}/>
            <pointLight position={[10, 10, 10]} intensity={0.5}/>
        </>,
        virtualScene
    )
}