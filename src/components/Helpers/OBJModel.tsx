import { useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { useTexture } from "@react-three/drei";
import { PropsWithChildren, useMemo } from "react";
import { Mesh } from "three";

type LoadOBJPNGProps = { path: string } & PropsWithChildren

export function OBJModel(props: LoadOBJPNGProps) {
    const obj = useLoader(OBJLoader, `${props.path}.obj`);
    const texture = useTexture(`${props.path}.png`);
    const geometry = useMemo(() => {
        let g;
        obj.traverse((c) => {
            if (c.type === "Mesh") {
                const _c = c as Mesh;
                g = _c.geometry;
            }
        });
        return g;
    }, [obj]);

    return (
        <mesh geometry={geometry}>
            <meshPhysicalMaterial map={texture}/>
            {props.children}
        </mesh>
    );
}