import { MeshBasicMaterialProps, MeshProps, useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { useTexture } from "@react-three/drei";
import React, { useMemo } from "react";
import { Mesh } from "three";

type LoadOBJPNGProps = {
    path: string,
    transparent?: boolean
    opacity?: number,

} & MeshProps & MeshBasicMaterialProps

export const OBJModel = React.forwardRef<Mesh, LoadOBJPNGProps>((props, ref) => {
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
            <mesh castShadow ref={ref} geometry={geometry} {...props}>
                <meshPhysicalMaterial map={texture}
                                      color={props.color}
                                      opacity={props.opacity}
                                      transparent={props.transparent}
                />
            </mesh>
        );
    }
)