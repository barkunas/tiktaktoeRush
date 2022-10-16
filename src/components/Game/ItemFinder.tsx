import { ItemObjectType, ItemType } from "./ItemType";
import { Model3DType } from "./Platforms";

export class ItemFinder {

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
            ...this.checkNeighbours([x - 1, y - 1, z], [x + 1, y + 1, z]),//
            ...this.checkNeighbours([x + 1, y - 1, z], [x - 1, y + 1, z]),//
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