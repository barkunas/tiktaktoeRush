import { useState } from "react";
import { ItemObjectType, ItemStatus, ItemType } from "./ItemType";
import { PlatformPillar } from "./PlatformPillar";
import { ItemFinder } from "./ItemFinder";

export type BlockerType = boolean;
export type Model3DType = PillarModelType[][];
export type PillarModelType = ItemObjectType[];
export type ModelPositionType = [number, number]
export const globalOffset = 4;
export const pillarSize = 3;

const initialBlocker: BlockerType = false
let initialModel3D: Model3DType = [[[], [], []], [[], [], []], [[], [], []]];
initialModel3D.forEach(k => {
    k.forEach(t => {
        for (let i = 0; i < 3; i++) {
            t.push({type: ItemType.Empty, status: ItemStatus.New})
        }
    })
})

export function Platforms() {
    const [blocker, setBlocker] = useState<BlockerType>(initialBlocker)
    const [model3D, setModel3D] = useState<Model3DType>(initialModel3D)
    const updateModel3D = (position: ModelPositionType) => {
        const newModel = JSON.parse(JSON.stringify(model3D)) as Model3DType;
        const pillarModel = newModel[position[0]][position[1]];
        for (let i = 0; i < pillarModel.length; i++) {
            if (pillarModel[i].type === ItemType.Empty) {
                pillarModel[i].type = getRandomAItemType();
                setModel3D(newModel);
                setBlocker(true);
                requrciveChecking(newModel)
                break;
            }
        }
    }

    function requrciveChecking(model: Model3DType) {
        const newModel2 = JSON.parse(JSON.stringify(model)) as Model3DType;
        const items = ItemFinder.findAllLines3D(newModel2)
        if (items.length !== 0) {
            setTimeout(() => {
                items.forEach(it => {
                    it.type = ItemType.Empty;
                    it.status = ItemStatus.New;
                })
                setModel3D(newModel2)
                setTimeout(() => {
                    const newModel3 = JSON.parse(JSON.stringify(newModel2)) as Model3DType;
                    fallItemsToEmptyPlaces(newModel3)
                    setModel3D(newModel3)
                    requrciveChecking(newModel3)
                }, 300)
            }, 1100);
        } else {
            setBlocker(false)
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

export function fallItemsToEmptyPlaces(model: Model3DType) {
    model.forEach((pillars, pillarsIndex) => {
        pillars.forEach((pillar, pillarIndex) => {
            pillars[pillarIndex] = pillar.filter(it => it.type !== ItemType.Empty);
            pillars[pillarIndex].forEach(it => it.status = ItemStatus.Old);
            while (pillars[pillarIndex].length < pillarSize) {
                pillars[pillarIndex].push({type: ItemType.Empty, status: ItemStatus.New})
            }
        })
    })
    return model;
}
