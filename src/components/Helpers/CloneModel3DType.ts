import { Model3DType } from "../InGame/Platforms";

export function CloneModel3DType(model: Model3DType) {
    return model.map(k => k.map(t => t.map(i => i.clone())))
}