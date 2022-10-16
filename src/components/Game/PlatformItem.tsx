import { Color, Mesh, MeshPhysicalMaterial, Object3D } from "three";
import { OBJModel } from "../Helpers/OBJModel";
import { ResourcesPaths } from "../../configs/resources";
import { ThreeEvent } from "@react-three/fiber";
import { BlockerType, PlatformsModel, UpdateModelFn } from "./Platforms";
import { ItemObjectType, ItemType } from "./ItemType";
import { Item } from "./Item";

type PlatformItemProps = {
    rowIndex: number,
    cellIndex: number,
    itemType: ItemObjectType,
    model: PlatformsModel,
    updateModel: UpdateModelFn
    clickBlocker: BlockerType
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
        if (props.clickBlocker) return
        const target = e.eventObject as Object3D;
        const position = target.name.split("-");
        const x = Number(position[0]);
        const y = Number(position[1]);
        if (props.model[x][y].type === ItemType.Empty) {
            props.model[x][y].type = getRandomAItemType()
            props.updateModel(props.model)
        }
    }
    const offset = [0, 4, 8];
    const x = offset[props.rowIndex];
    const y = offset[props.cellIndex];
    return (
        <group position={[y, 0, x]} key={`${props.rowIndex}-${props.cellIndex}`}>
            <OBJModel path={ResourcesPaths.platform1}
                      name={`${props.rowIndex}-${props.cellIndex}`}
                      onPointerEnter={platformOnPointerEnterHandler}
                      onPointerLeave={platformOnPointerLeaveHandler}
                      onClick={platformOnClickHandler}
            />
            <Item type={props.itemType}/>
        </group>
    )
}


function getRandomAItemType() {
    const min = 1;
    const max = 2
    return Math.floor(Math.random() * (max - min + 1) + min)
}