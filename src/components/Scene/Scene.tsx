import { useFrame, useThree } from "@react-three/fiber";
import { Object3D, ObjectLoader } from "three";
import json from "../../jsonScenes/sceneTemplate.json";
import React from "react";
import { OrbitControls } from "@react-three/drei";
import { Game } from "../Game/Game";

export function Scene() {
    const treeState = useThree();
    console.log(treeState.scene)
    const camera = treeState.camera
    let counting = 0;
    let dist = true;
    useFrame((state) => {
        if (dist) {
            camera.position.x += 0.01
            camera.position.y += 0.01
            camera.rotateX(-0.001)
            counting++
            if (counting === 100) dist = !dist
        } else {
            camera.position.x -= 0.01
            camera.position.y -= 0.01
            camera.rotateX(0.001)
            counting--
            if (counting === 0) dist = !dist
        }
    })
    const scene = new ObjectLoader().parse<Object3D>(json.scene);
    return (
        <>
            <OrbitControls enablePan={false}
                           enableZoom={false}
                           minPolarAngle={Math.PI / 4}
                           maxPolarAngle={Math.PI / 4}/>
            <primitive object={scene}/>
            <Game/>
        </>
    )
}