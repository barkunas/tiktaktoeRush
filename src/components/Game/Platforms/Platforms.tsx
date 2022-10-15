import { useState } from "react";
import { ItemType, PlatformItem } from "./PlatformItem";

export type PlatformsModel = ItemType[][];
export type UpdateModelFn = (model: PlatformsModel) => void

const initialModel: PlatformsModel = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]

export function Platforms() {
    const [model, setModel] = useState(initialModel)
    const updateModel: UpdateModelFn = (model: PlatformsModel) => {
        setModel([...model])
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
                />
            );
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