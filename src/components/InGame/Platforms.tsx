import { ItemObjectType } from "./ItemType";
import { PlatformPillar } from "./PlatformPillar";
import { initialModel3D } from "../../redux/Model3DReducer";

export type Model3DType = PillarModelType[][];
export type PillarModelType = ItemObjectType[];
export type ModelPositionType = [number, number]
export const globalOffset = 4;
export const pillarSize = 3;

export function Platforms() {
    const pillars: JSX.Element[] = [];
    initialModel3D.forEach((section, sectionIndex) => {
        section.forEach((pillarModel, pillarModelIndex) => {
            pillars.push(
                <PlatformPillar key={`${globalOffset * sectionIndex}${globalOffset * pillarModelIndex}`}
                                positionInModel={[sectionIndex, pillarModelIndex]}
                />
            )
        })
    });

    return (
        <>
            <axesHelper/>
            <group position={[-8, 0, 0]}>
                {pillars}
            </group>
        </>
    );
}
