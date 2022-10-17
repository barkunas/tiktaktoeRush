import { Object3D, ObjectLoader } from "three";
import json from "../../jsonScenes/sceneTemplate.json";
import React from "react";
import { OrbitControls } from "@react-three/drei";
import { Game } from "../Game/Game";
import { GameUI } from "../Game/GameUi";

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
            <GameUI/>
            <Game/>
        </>
    )
}

