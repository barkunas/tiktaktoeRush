import React, { useRef, useState } from "react";
import { Color, Group, Mesh, Vector3 } from "three";
import { OBJModel } from "../Helpers/OBJModel";
import { ResourcesMenu } from "../../configs/resources";
import { ThreeEvent, useFrame, useThree } from "@react-three/fiber";
import { useDispatch } from "react-redux";
import { toInGame } from "../../redux/GamePageReducer";

type MainMenuProps = {}

export function MainMenuBoard() {
    return (
        <PlayButton/>
    )
}

function PlayButton() {
    const tempRef = useRef<Group>(null!)
    const animRef = useRef<Mesh>(null!)
    const [hover, setHover] = useState(false)
    const dispatch = useDispatch()
    useFrame(() => {
        const scale = animRef.current.scale
        if (hover) {
            scale.lerp(new Vector3(0.9, 0.9, 0.9), 0.2)
        } else {
            scale.lerp(new Vector3(1, 1, 1), 0.2)
        }
    })
    const onPointerEnterHandler = (e: ThreeEvent<PointerEvent>) => {
        setHover(true)
    }
    const onPointerLeaveHandler = (e: ThreeEvent<PointerEvent>) => {
        setHover(false)

    }
    const onClickHandler = () => {
        dispatch(toInGame())
    }
    return (
        <group ref={tempRef}
               position={[-1.5, 7, 0]}
               rotation={[0, -0.6, 0]}>
            <group
                position={[-7, 2, 3]}
            >
                <OBJModel ref={animRef}
                          onPointerEnter={onPointerEnterHandler}
                          onPointerLeave={onPointerLeaveHandler}
                          onClick={onClickHandler}
                          path={ResourcesMenu.playBtn}
                />
            </group>
        </group>
    )
}