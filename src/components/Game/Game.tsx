import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { OBJModel } from "../Helpers/OBJModel";

export const mtlLoader = new MTLLoader();
mtlLoader.setPath("http://localhost:3000/models/");

export function Game() {

    return (
        <OBJModel path={"/models/platform/platform1"}></OBJModel>
    );
}


