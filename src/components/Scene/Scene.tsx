import { createPortal, useFrame, useThree } from "@react-three/fiber";
import { Group, Matrix4, Mesh, Object3D, ObjectLoader, Scene as ThreeScene } from "three";
import json from "../../jsonScenes/sceneTemplate.json";
import React, { useMemo, useRef, useState } from "react";
import { OrbitControls, OrthographicCamera, PerspectiveCamera, Text, useCamera } from "@react-three/drei";
import { Game } from "../Game/Game";
import { OBJModel } from "../Helpers/OBJModel";
import { ResourcesUI } from "../../configs/resources";

export function Scene() {
    const scene = new ObjectLoader().parse<Object3D>(json.scene);
    return (
        <>
            <OrbitControls makeDefault
                           enablePan={true}
                           enableZoom={true}
                           autoRotate={true}
                           minPolarAngle={Math.PI / 4}
                           maxPolarAngle={Math.PI / 1}/>
            <primitive object={scene}/>
            <Viewcube/>
            <Game/>
        </>
    )
}

function Viewcube() {
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
                        <Text position={[0.75,1.8,1]} fontSize={0.7}>22</Text>
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