import { Color, Euler, Mesh, MeshPhysicalMaterial, Object3D } from "three";
import { OBJModel } from "../../Helpers/OBJModel";
import { ResourcesPaths } from "../../../configs/resources";
import { ThreeEvent } from "@react-three/fiber";
import { PlatformsModel, UpdateModelFn } from "./Platforms";

type PlatformItemProps = {
    rowIndex: number,
    cellIndex: number,
    itemType: ItemType,
    model: PlatformsModel,
    updateModel: UpdateModelFn
}

export function PlatformItem(props: PlatformItemProps) {
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
        props.model[x][y] = 1
        props.updateModel(props.model)
    }
    const offset = [0, 4, 8];
    const x = offset[props.rowIndex];
    const y = offset[props.cellIndex];
    return (<group position={[y, 0, x]} key={`${props.rowIndex}-${props.cellIndex}`}>
        <OBJModel path={ResourcesPaths.platform1}
                  name={`${props.rowIndex}-${props.cellIndex}`}
                  onPointerEnter={platformOnPointerEnterHandler}
                  onPointerLeave={platformOnPointerLeaveHandler}
                  onClick={platformOnClickHandler}
        />
        <Item type={props.itemType}/>
    </group>)
}

export enum ItemType {
    Empty,
    Circle,
    Cross
}

export type ItemProps = {
    type: ItemType
}

function Item(props: ItemProps) {
    switch (props.type) {
        case ItemType.Empty:
            return null
        case ItemType.Circle:
            return <OBJModel path={ResourcesPaths.point1} position={[2, 0, 1]} rotation={new Euler(0, 0.8)}/>;
        case ItemType.Cross:
            return <OBJModel path={ResourcesPaths.point2}/>;
    }
}