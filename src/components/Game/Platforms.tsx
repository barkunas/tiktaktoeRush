import { useState } from "react";
import { ItemObjectType, ItemType } from "./ItemType";
import { PlatformPillar } from "./PlatformPillar";
import { ItemFinder } from "./ItemFinder";

export type BlockerType = boolean;
export type Model3DType = PillarModelType[][];
export type PillarModelType = ItemObjectType[];
export type ModelPositionType = [number, number]
export const globalOffset = 4;

const initialBlocker: BlockerType = false
const initialModel3D: Model3DType = [
    [[{type: ItemType.Empty}, {type: ItemType.Empty}, {type: ItemType.Empty}], [{type: ItemType.Empty}, {type: ItemType.Empty}, {type: ItemType.Empty}], [{type: ItemType.Empty}, {type: ItemType.Empty}, {type: ItemType.Empty}]],
    [[{type: ItemType.Empty}, {type: ItemType.Empty}, {type: ItemType.Empty}], [{type: ItemType.Empty}, {type: ItemType.Empty}, {type: ItemType.Empty}], [{type: ItemType.Empty}, {type: ItemType.Empty}, {type: ItemType.Empty}]],
    [[{type: ItemType.Empty}, {type: ItemType.Empty}, {type: ItemType.Empty}], [{type: ItemType.Empty}, {type: ItemType.Empty}, {type: ItemType.Empty}], [{type: ItemType.Empty}, {type: ItemType.Empty}, {type: ItemType.Empty}]]
]

export function Platforms() {
    const [blocker, setBlocker] = useState<BlockerType>(initialBlocker)
    const [model3D, setModel3D] = useState<Model3DType>(initialModel3D)
    const updateModel3D = (position: ModelPositionType) => {
        const newModel = JSON.parse(JSON.stringify(model3D)) as Model3DType;
        const pillarModel = newModel[position[0]][position[1]];
        for (let i = 0; i < pillarModel.length; i++) {
            if (pillarModel[i].type === ItemType.Empty) {
                pillarModel[i].type = getRandomAItemType()
                const newModel2 = JSON.parse(JSON.stringify(newModel)) as Model3DType;
                const items = ItemFinder.findAllLines3D(newModel2)
                setModel3D(newModel);
                if (items.length !== 0) {
                    setBlocker(true);
                    setTimeout(() => {
                        items.forEach(it => {
                            it.type = ItemType.Empty;
                        })
                        setModel3D(newModel2)
                        setBlocker(false)
                    }, 2000)
                }
                break;
            }
        }

    }
    const pillars: JSX.Element[] = [];
    model3D.forEach((section, sectionIndex) => {
        section.forEach((pillarModel, pillarModelIndex) => {
            console.log("tik")
            pillars.push(
                <PlatformPillar positionX={globalOffset * sectionIndex}
                                positionY={globalOffset * pillarModelIndex}
                                key={`${globalOffset * sectionIndex}${globalOffset * pillarModelIndex}`}
                                pillarModel={pillarModel}
                                updateModel3D={updateModel3D}
                                positionInModel={[sectionIndex, pillarModelIndex]}
                                clickBlocker={blocker}
                />
            )
        })
    })
    return (
        <>
            <axesHelper/>
            <group position={[-8, 0, 0]}>
                {pillars}
            </group>
        </>
    );
}


function getRandomAItemType() {
    const min = 1;
    const max = 2
    return Math.floor(Math.random() * (max - min + 1) + min)
}