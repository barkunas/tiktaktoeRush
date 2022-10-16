import { useState } from "react";
import { ItemObjectType, ItemType } from "./ItemType";
import { PlatformPillar } from "./PlatformPillar";

export type PlatformsModel = ItemObjectType[][];
export type UpdateModelFn = (model: PlatformsModel) => void;
export type BlockerType = boolean;
export type Model3DType = PillarModelType[][];
export type PillarModelType = ItemObjectType[];
export type ModelPositionType = [number, number]

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

export const globalOffset = 4;

class ItemFinder {

    static findAllLines3D(model: Model3DType) {
        let items: ItemObjectType[] = [];
        model.forEach((pillars, x) => {
            pillars.forEach((pillar, y) => {
                pillar.forEach((item, z) => {
                    if (item.type !== ItemType.Empty) {
                        items = [...items, ...(new ItemFinder(model, item, x, y, z).check())]
                    }
                });
            });
        });
        return items;
    }

    constructor(private readonly model3D: Model3DType, public readonly link: ItemObjectType, public readonly x: number, public readonly y: number, public readonly z: number) {
    }

    public check() {
        const x = this.x;
        const y = this.y;
        const z = this.z;
        return [
            ...this.checkNeighbours([x, y, z + 1], [x, y, z - 1]),//
            ...this.checkNeighbours([x + 1, y, z], [x - 1, y, z]),//
            ...this.checkNeighbours([x, y + 1, z], [x, y - 1, z]),//
            ...this.checkNeighbours([x-1, y-1, z], [x+1, y+1, z]),//
            ...this.checkNeighbours([x+1, y-1, z], [x-1, y+1, z]),//
            ...this.checkNeighbours([x - 1, y, z + 1], [x + 1, y, z - 1]),//
            ...this.checkNeighbours([x + 1, y, z + 1], [x - 1, y, z - 1]),//
            ...this.checkNeighbours([x, y + 1, z + 1], [x, y - 1, z - 1]),//
            ...this.checkNeighbours([x, y + 1, z - 1], [x, y - 1, z + 1]),//
            ...this.checkNeighbours([x + 1, y + 1, z + 1], [x - 1, y - 1, z - 1]),//
            ...this.checkNeighbours([x - 1, y + 1, z - 1], [x + 1, y - 1, z + 1]),//
            ...this.checkNeighbours([x - 1, y + 1, z + 1], [x + 1, y - 1, z - 1]),//
            ...this.checkNeighbours([x + 1, y + 1, z - 1], [x - 1, y - 1, z + 1]),//
        ];
    }

    private checkNeighbours(left: [x: number, y: number, z: number], right: [x: number, y: number, z: number]): ItemObjectType[] {
        try {
            const _left = this.model3D[left[0]][left[1]][left[2]]
            const _right = this.model3D[right[0]][right[1]][right[2]]
            if (_left.type === this.link.type && _right.type === this.link.type) {
                return [this.link, _left, _right]
            }
            return []
        } catch (e) {
            return []
        }
    }

}

function getRandomAItemType() {
    const min = 1;
    const max = 2
    return Math.floor(Math.random() * (max - min + 1) + min)
}