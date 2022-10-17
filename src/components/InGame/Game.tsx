import { Platforms } from "./Platforms";
import {  Object3D, ObjectLoader } from "three";
import json from "../../jsonScenes/sceneTemplate.json";

export function Game() {
    const scene = new ObjectLoader().parse<Object3D>(json.scene);
    return (
        <>
            <primitive object={scene}/>
            <Platforms />
        </>
    );
}