import { OBJModel } from "../../Helpers/OBJModel";
import { MutableRefObject, Ref, useEffect, useRef, useState } from "react";
import { Box3, BufferGeometry, Material, Mesh, Vector3 } from "three";

export function Platforms() {
    const ref = useRef<Mesh>(null!);
    const platformPath = "/models/platform/platform1";
    console.log("Mesh")
    console.log(ref)
    /*useEffect(() => {
        const mesh = ref.current;
        const box = new Box3();
        box.expandByObject(mesh);
        const size = box.getSize(new Vector3());
        console.log("Size");
        console.log(size);
        mesh.position.setZ(4);
        mesh.position.setY(0);

    })*/
    return (
        <group position={[-8,0,0]}>
            <OBJModel ref={ref} path={platformPath} position={[0,0,0]}/>
            <OBJModel path={platformPath} position={[0,0,4]}/>
            <OBJModel path={platformPath} position={[0,0,8]}/>

            <OBJModel path={platformPath} position={[4,0,0]}/>
            <OBJModel path={platformPath} position={[4,0,4]}/>
            <OBJModel path={platformPath} position={[4,0,8]}/>

            <OBJModel path={platformPath} position={[8,0,0]}/>
            <OBJModel path={platformPath} position={[8,0,4]}/>
            <OBJModel path={platformPath} position={[8,0,8]}/>
        </group>
    );
}


