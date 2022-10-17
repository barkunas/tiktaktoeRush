import React, { useRef } from "react";
import { Group } from "three";
import { useSelector } from "react-redux";
import { selectCount } from "../../redux/GameCounterReducer";
import { Text } from "@react-three/drei";
import { OBJModel } from "../Helpers/OBJModel";
import { ResourcesUI } from "../../configs/resources";
import { useThree } from "@react-three/fiber";
import { GameUI } from "../Helpers/GameUi";
import { MainMenuBoard } from "../Menu/MainMenuBoard";

type MainMenuProps = {}

export function MainMenuPage() {
    return (
        <>
            {/*<GameUI>*/}

            <pointLight position={[0, 20, 10]} intensity={2} />
            <MainMenuBoard/>
            {/* </GameUI>*/}
        </>
    )
}