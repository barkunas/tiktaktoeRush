import { OBJModel } from "../../Helpers/OBJModel";
import { useState } from "react";
import { Color, Euler, Mesh, MeshPhysicalMaterial, Object3D } from "three";
import { ResourcesPaths } from "../../../configs/resources"
import { ThreeEvent } from "@react-three/fiber";

export function Platforms() {
    const [model, setModel] = useState([[0, 0, 0], [0, 0, 0], [0, 0, 0]])
    const [activeUser, setActiveUser] = useState(true)

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
    const platformOnClickHandler = (e: ThreeEvent<MouseEvent>) => {
        const target = e.eventObject as Object3D;
        const position = target.name.split("-");
        const x = Number(position[0]);
        const y = Number(position[1]);
        console.log(e)
        model[x][y]=+activeUser+1
        setModel([...model])
        setActiveUser(!activeUser)
    }
    const platforms: JSX.Element[] = []
    const offset = [0, 4, 8];
    model.forEach((row, rowInd) => {
        row.forEach((cell, cellInd) => {
            const x = offset[rowInd];
            const y = offset[cellInd];
            let item: JSX.Element | null = null;
            switch (model[rowInd][cellInd]) {
                case 1:
                    item = <OBJModel path={ResourcesPaths.point1} position={[2, 0, 1]} rotation={new Euler(0, 0.8)}/>;
                    break;
                case 2:
                    item = <OBJModel path={ResourcesPaths.point2}/>;
                    break;
            }
            platforms.push(
                <group position={[y, 0, x]} key={`${rowInd}-${cellInd}`}>
                    <OBJModel path={ResourcesPaths.platform1}
                              name={`${rowInd}-${cellInd}`}
                              onPointerEnter={platformOnPointerEnterHandler}
                              onPointerLeave={platformOnPointerLeaveHandler}
                              onClick={platformOnClickHandler}
                    />
                    {item}
                </group>
            )
        })
    })
    return (
        <>
            <axesHelper/>
            <group position={[-8, 0, 0]}>
                {platforms}
            </group>
        </>
    );
}