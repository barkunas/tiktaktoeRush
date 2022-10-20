import { Platforms } from "./Platforms";
import { Object3D, ObjectLoader } from "three";
import json from "../../jsonScenes/scene.json";

import { softShadows, Sky } from "@react-three/drei";
softShadows()

export function Game() {
    const scene = new ObjectLoader().parse<Object3D>(json);
    return (
        <>
            <Sky azimuth={0.1} turbidity={10} rayleigh={0.5} inclination={0.6} distance={1000} />

            {/*<group position={[-5, -12, 0]}>
                <Cloud position={[-10, -2, 20]} speed={0.5} opacity={1} />
                <Cloud position={[10, 2, -25]} speed={0.5} opacity={0.5} />
                <Cloud position={[-5, 2, -20]} speed={0.5} opacity={1} />
                <Cloud position={[10, -2, 25]} speed={0.5} opacity={0.5} />
                <Cloud position={[10, 2, 15]} speed={0.5} opacity={0.75} />
            </group>
            <group position={[-35, 10, 0]} rotation={[0,0.5,0]}>
                <Cloud position={[-10, -2, 20]} speed={0.5} opacity={1} />
                <Cloud position={[10, 2, -25]} speed={0.5} opacity={0.5} />
                <Cloud position={[-5, 2, -20]} speed={0.5} opacity={1} />
                <Cloud position={[10, -2, 25]} speed={0.5} opacity={0.5} />
                <Cloud position={[10, 2, 15]} speed={0.5} opacity={0.75} />
            </group>
            <group position={[35, 0, 0]} rotation={[0.2,-0.2,0]}>
                <Cloud position={[-10, -2, 20]} speed={0.5} opacity={1} />
                <Cloud position={[10, 2, -25]} speed={0.5} opacity={0.5} />
                <Cloud position={[-5, 2, -20]} speed={0.5} opacity={1} />
                <Cloud position={[10, -2, 25]} speed={0.5} opacity={0.5} />
                <Cloud position={[10, 2, 15]} speed={0.5} opacity={0.75} />
            </group>*/}
            <primitive object={scene}/>
            <Platforms/>
        </>
    );
}