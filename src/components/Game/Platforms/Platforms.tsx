import { OBJModel } from "../../Helpers/OBJModel";
import { MutableRefObject, Ref, useEffect, useRef, useState } from "react";
import { AxesHelper, Box3, BufferGeometry, Euler, Material, Mesh, Vector3 } from "three";
import { ResourcesPaths } from "../../../configs/resources"


export function Platforms() {
    const ref = useRef<Mesh>(null!);
    console.log("Mesh")
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
    const axesHelper = new AxesHelper(5);
    return (
        <>
            <axesHelper/>
            <group position={[-8, 0, 0]}>
                <OBJModel ref={ref} path={ResourcesPaths.platform1} position={[0, 0, 0]}/>
                <group position={[0, 0, 4]}>
                    <OBJModel path={ResourcesPaths.platform1} />
                    <OBJModel path={ResourcesPaths.point1} position={[2, 0, 1]} rotation={new Euler(0,0.8)}/>
                </group>
                <OBJModel path={ResourcesPaths.platform1} position={[0, 0, 8]}/>

                <OBJModel path={ResourcesPaths.platform1} position={[4, 0, 0]}/>
                <OBJModel path={ResourcesPaths.platform1} position={[4, 0, 4]}/>
                <OBJModel path={ResourcesPaths.platform1} position={[4, 0, 8]}/>

                <group position={[8, 0, 0]}>
                    <OBJModel path={ResourcesPaths.platform1} />
                    <OBJModel path={ResourcesPaths.point2}/>
                </group>
                <OBJModel path={ResourcesPaths.platform1} position={[8, 0, 4]}/>
                <OBJModel path={ResourcesPaths.platform1} position={[8, 0, 8]}/>
            </group>
        </>
    );
}