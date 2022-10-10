import { Canvas, Props } from "@react-three/fiber";
import { ObjectLoader, PerspectiveCamera } from "three";
import json from "../../jsonScenes/sceneTemplate.json";
import React from "react";

export function CustomCanvas(props: Props) {
    const camera2 = new ObjectLoader().parse<PerspectiveCamera>(json.camera);
    return (
        <Canvas gl={{antialias: true}} camera={camera2} {...props}>
            {props.children}
        </Canvas>
    )
}