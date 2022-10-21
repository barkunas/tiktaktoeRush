import { useSelector } from "react-redux";
import { globalOffset, Model3DType, ModelPositionType } from "./Platforms";
import { Item, ItemType } from "./ItemType";
import { GameElement } from "./GameElement";
import React from "react";

export type PillarGameElementsProps = {
    positionInModel: ModelPositionType

}

export function PillarGameElements(props: PillarGameElementsProps) {
    const pillarModel = useSelector<{ model: { value: Model3DType } }, Item[]>(state => state.model.value[props.positionInModel[0]][props.positionInModel[1]])
    const positionX = globalOffset * props.positionInModel[0];
    const positionZ = globalOffset * props.positionInModel[1];
    const pillarsElems = pillarModel.map((item, i) =>
        <group key={item.key}
               position={[positionX, 0, positionZ]}>
            <GameElement
                positionY={i * globalOffset}
                key={item.key}
                elementType={item}
                isShowing={item.type !== ItemType.Empty}/>
        </group>
    )

    return (
        <group>
            {pillarsElems}
        </group>
    )
}