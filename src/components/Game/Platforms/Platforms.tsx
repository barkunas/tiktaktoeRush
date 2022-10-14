import { OBJModel } from "../../Helpers/OBJModel";
import { MutableRefObject, Ref, useEffect, useRef, useState } from "react";
import { AxesHelper, Box3, BufferGeometry, Color, Euler, Material, Mesh, MeshPhysicalMaterial, Vector3 } from "three";
import { ResourcesPaths } from "../../../configs/resources"
import { ThreeEvent } from "@react-three/fiber";


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
    const platformOnPointerEnterHandler = (e: ThreeEvent<MouseEvent>) => {
        const target = e.eventObject as Mesh;
        const material = target.material as MeshPhysicalMaterial
        material.color = new Color(0xffCfff)
    }
    const platformOnPointerLeaveHandler = (e: ThreeEvent<MouseEvent>) => {
        const target = e.eventObject as Mesh;
        const material = target.material as MeshPhysicalMaterial
        material.color = new Color(0xffffff)
    }
    return (
        <>
            <axesHelper/>
            <group position={[-8, 0, 0]}>
                <OBJModel ref={ref} path={ResourcesPaths.platform1} position={[0, 0, 0]}
                          onPointerEnter={platformOnPointerEnterHandler}
                          onPointerLeave={platformOnPointerLeaveHandler}/>
                <group position={[0, 0, 4]}>
                    <OBJModel path={ResourcesPaths.platform1}
                              onPointerEnter={platformOnPointerEnterHandler}
                              onPointerLeave={platformOnPointerLeaveHandler}
                    />
                    <OBJModel path={ResourcesPaths.point1} position={[2, 0, 1]} rotation={new Euler(0, 0.8)}/>
                </group>
                <OBJModel path={ResourcesPaths.platform1} position={[0, 0, 8]}
                          onPointerEnter={platformOnPointerEnterHandler}
                          onPointerLeave={platformOnPointerLeaveHandler}/>

                <OBJModel path={ResourcesPaths.platform1} position={[4, 0, 0]}
                          onPointerEnter={platformOnPointerEnterHandler}
                          onPointerLeave={platformOnPointerLeaveHandler}/>
                <OBJModel path={ResourcesPaths.platform1} position={[4, 0, 4]}
                          onPointerEnter={platformOnPointerEnterHandler}
                          onPointerLeave={platformOnPointerLeaveHandler}/>
                <OBJModel path={ResourcesPaths.platform1} position={[4, 0, 8]}
                          onPointerEnter={platformOnPointerEnterHandler}
                          onPointerLeave={platformOnPointerLeaveHandler}/>

                <group position={[8, 0, 0]}>
                    <OBJModel path={ResourcesPaths.platform1}
                              onPointerEnter={platformOnPointerEnterHandler}
                              onPointerLeave={platformOnPointerLeaveHandler}/>
                    <OBJModel path={ResourcesPaths.point2}/>
                </group>
                <OBJModel path={ResourcesPaths.platform1} position={[8, 0, 4]}
                          onPointerEnter={platformOnPointerEnterHandler}
                          onPointerLeave={platformOnPointerLeaveHandler}/>
                <OBJModel path={ResourcesPaths.platform1} position={[8, 0, 8]}
                          onPointerEnter={platformOnPointerEnterHandler}
                          onPointerLeave={platformOnPointerLeaveHandler}/>
            </group>
        </>
    );
}