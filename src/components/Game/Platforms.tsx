import { useState } from "react";
import { PlatformItem } from "./PlatformItem";
import { ItemType } from "./ItemType";
import { PlatformPillar } from "./PlatformPillar";

export type PlatformsModel = ItemType[][];
export type UpdateModelFn = (model: PlatformsModel) => void;
export type BlockerType = boolean;
export type Model3DType = PillarModelType[][];
export type PillarModelType = ItemType[];
export type ModelPositionType = [number, number]

const initialModel: PlatformsModel = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
const initialBlocker: BlockerType = false
const initialModel3D: Model3DType = [
    [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
    [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
    [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
]

export function Platforms() {
    const [model, setModel] = useState<PlatformsModel>(initialModel)
    const [blocker, setBlocker] = useState<BlockerType>(initialBlocker)
    const [model3D, setModel3D] = useState<Model3DType>(initialModel3D)
    const updateModel: UpdateModelFn = (model: PlatformsModel) => {
        const {hasChanges, newModel} = checkFullLine(model);
        setModel([...model])
        if (hasChanges) {
            setBlocker(true)
            setTimeout(() => {
                console.log("tik")
                setModel(newModel)
                setBlocker(false)
            }, 2000)
        }

    }
    const updateModel3D = (position: ModelPositionType) => {
        const newModel = JSON.parse(JSON.stringify(model3D)) as Model3DType;
        const pillarModel = newModel[position[0]][position[1]];
        for (let i = 0; i < pillarModel.length; i++) {
            if (pillarModel[i] === ItemType.Empty) {
                pillarModel[i] = getRandomAItemType()
                setModel3D(newModel);
                break;
            }
        }

    }
    const platforms: JSX.Element[] = []
    model.forEach((row, rowInd) => {
        row.forEach((cell, cellInd) => {
            platforms.push(
                <PlatformItem
                    rowIndex={rowInd}
                    cellIndex={cellInd}
                    itemType={model[rowInd][cellInd]}
                    model={model}
                    updateModel={updateModel}
                    clickBlocker={blocker}
                />
            );
        })
    })
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
                />
            )
        })
    })

    return (
        <>
            <axesHelper/>
            {/*<group position={[-8, 0, 0]}>
                {platforms}
            </group>*/}
            <group position={[-8, 0, 0]}>
                {pillars}
            </group>
        </>
    );
}

export const globalOffset = 4;


function checkFullLine(model: PlatformsModel): { hasChanges: boolean, newModel: PlatformsModel } {
    const newModel = JSON.parse(JSON.stringify(model)) as PlatformsModel
    let hasChanges = false
    const changes: (() => void)[] = []
    newModel.forEach((row, index) => {
        if (!row.some(c => c === ItemType.Empty) && row.every(i => i === row[0])) {
            hasChanges = true
            changes.push(() => {
                newModel[index] = row.map(i => ItemType.Empty)
            })
        }
        row.forEach((cell, index) => {
            const result = newModel.map(r => r[index]);
            if (!result.some(c => c === ItemType.Empty) && result.every(it => it === cell)) {
                hasChanges = true
                changes.push(() => {
                    newModel.forEach((row) => {
                        row[index] = ItemType.Empty
                    })
                })
            }
        })
    });

    const diagonal1: ItemType[] = []
    for (let i = 0; i < newModel.length; i++) {
        diagonal1.push(newModel[i][i])
    }
    if (!diagonal1.some(c => c === ItemType.Empty) && diagonal1.every(it => it === diagonal1[0])) {
        hasChanges = true
        changes.push(() => {
            for (let i = 0; i < newModel.length; i++) {
                newModel[i][i] = ItemType.Empty
            }
        })
    }

    const diagonal2: ItemType[] = []
    for (let i = 0, k = newModel.length - 1; i < newModel.length; i++, k--) {
        diagonal2.push(newModel[i][k])
    }
    if (!diagonal2.some(c => c === ItemType.Empty) && diagonal2.every(it => it === diagonal2[0])) {
        hasChanges = true
        changes.push(() => {
            for (let i = 0, k = newModel.length - 1; i < newModel.length; i++, k--) {
                newModel[i][k] = ItemType.Empty
            }
        })
    }


    changes.forEach((fnc) => fnc())
    return {hasChanges, newModel}
}

function getRandomAItemType() {
    const min = 1;
    const max = 2
    return Math.floor(Math.random() * (max - min + 1) + min)
}