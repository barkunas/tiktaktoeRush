import { ItemType } from "./ItemType";
import { OBJModel } from "../Helpers/OBJModel";
import { ResourcesPaths } from "../../configs/resources";
import { Euler } from "three";

export type ItemProps = {
    type: ItemType
}


export function Item(props: ItemProps) {
    switch (props.type) {
        case ItemType.Empty:
            return null
        case ItemType.Circle:
            return <OBJModel path={ResourcesPaths.point1} position={[2, 0, 1]} rotation={new Euler(0, 0.8)}/>;
        case ItemType.Cross:
            return <OBJModel path={ResourcesPaths.point2}/>;
    }
}