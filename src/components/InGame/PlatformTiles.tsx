import { globalOffset, Model3DType, ModelPositionType, pillarSize } from "./Platforms";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThreeEvent } from "@react-three/fiber";
import { Item, ItemType } from "./ItemType";
import { setModel } from "../../redux/Model3DReducer";
import { ItemFinder } from "./ItemFinder";
import { increment } from "../../redux/GameCounterReducer";
import { PillarTile } from "./PillarTile";
import { lock, selectBlockerValue, unlock } from "../../redux/ClickTilesBlockerReducer";
import { CloneModel3DType } from "../Helpers/CloneModel3DType";
import { dequeue, selectFirst } from "../../redux/ItemsQueueReducer";

export type PlatformTilesProps = {
    positionInModel: ModelPositionType
}

const defaultOpacity = 0.5;
const hoverOpacity = 1;

export function PlatformTiles(props: PlatformTilesProps) {
    const [opacity, setOpacity] = useState(defaultOpacity);
    const dispatch = useDispatch();
    const clickBlocker = useSelector(selectBlockerValue);
    const nextItem = useSelector(selectFirst);
    const model = useSelector<{ model: { value: Model3DType } }, Model3DType>(state => state.model.value);
    const pillarModel = model[props.positionInModel[0]][props.positionInModel[1]];

    const positionX = globalOffset * props.positionInModel[0];
    const positionY = globalOffset * props.positionInModel[1];
    const platformOnPointerEnterHandler = (e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        setOpacity(hoverOpacity);
    }
    const platformOnPointerLeaveHandler = (e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        setOpacity(defaultOpacity);
    }
    const onclickHandler = (e: ThreeEvent<MouseEvent>) => {
        if (clickBlocker) return;
        e.stopPropagation();
        isFreePillar(model, props.positionInModel) && updateModel3D(model, props.positionInModel);

    }

    function opponentsBotProcess(model: Model3DType, opponentToken?: boolean) {
        if (opponentToken != null) return;
        const newModel = CloneModel3DType(model);
        updateModel3D(newModel, getAbsentRandomPillar(newModel), true)
    }

    function getAbsentRandomPillar(model: Model3DType): ModelPositionType {
        const freePillar: ModelPositionType[] = [];
        model.forEach((pillars, i) => pillars.forEach((pillar, k) => {
            if (isFreePillar(model, [i, k])) freePillar.push([i, k])
        }))
        if (freePillar.length === 0) throw new Error("End game")
        return freePillar[Math.floor(Math.random() * freePillar.length)]
    }

    function isFreePillar(model: Model3DType, position: ModelPositionType) {
        return model[position[0]][position[1]].some(it => it.type === ItemType.Empty);
    }

    function updateModel3D(model: Model3DType, position: ModelPositionType, opponentToken?: boolean) {
        dispatch(dequeue());
        const newModel = CloneModel3DType(model);
        const pillarModel = newModel[position[0]][position[1]];
        for (let i = 0; i < pillarModel.length; i++) {
            if (pillarModel[i].type === ItemType.Empty) {
                pillarModel[i] = nextItem.element;
                dispatch(setModel(newModel));
                dispatch(lock());
                recursiveChecking(newModel, opponentToken);
                break;
            }
        }
    }

    async function recursiveChecking(model: Model3DType, opponentToken?: boolean) {
        dispatch(lock());
        const newModel2 = CloneModel3DType(model);
        const items = ItemFinder.findAllLines3D(newModel2)
        if (items.length !== 0) {
            await Delayed(() => {
                items.forEach(it => {
                    it.willUnmount();
                    dispatch(increment())
                })
                dispatch(setModel(newModel2));
            }, 1000);
            await Delayed(() => {
                const newModel3 = CloneModel3DType(newModel2);
                fallItemsToEmptyPlaces(newModel3);
                dispatch(setModel(newModel3));
                recursiveChecking(newModel3, opponentToken);
            }, 300)
        } else {
            opponentToken && dispatch(unlock());
            console.log("opponentsBotProcess")
            await Delayed(()=>{
                opponentsBotProcess(model, opponentToken)
            },1100)
        }
    }

    const tiles = pillarModel.map((it, index) => {
        return (
            <group
                onPointerEnter={platformOnPointerEnterHandler}
                onPointerLeave={platformOnPointerLeaveHandler}
                onClick={onclickHandler}
                position={[positionX, index * globalOffset, positionY]}
                key={index}>
                <PillarTile opacity={opacity}/>
            </group>
        )
    })
    return (<>{tiles}</>)
}

function fallItemsToEmptyPlaces(model: Model3DType) {
    model.forEach((pillars) => {
        pillars.forEach((pillar, pillarIndex) => {
            pillars[pillarIndex] = pillar.filter(it => !it.isWillUnmount && it.type !== ItemType.Empty);
            while (pillars[pillarIndex].length < pillarSize) {
                pillars[pillarIndex].push(new Item(true));
            }
        })
    })
    return model;
}

async function Delayed(fn: Function, ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(() => {
        fn();
        resolve();
    }, ms));
}