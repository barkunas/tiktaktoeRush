import { Camera, createPortal, useFrame, useThree } from "@react-three/fiber";
import { ReactNode, useMemo, useRef } from "react";
import { Scene as ThreeScene } from "three";
import { OrthographicCamera, useCamera } from "@react-three/drei";

export enum HorizontalAlignment {
    Center,
    Left,
    Right
}

export enum VerticalAlignment {
    Center,
    Top,
    Bottom
}

export type GameUIProps = {
    children: ReactNode,
    hAignment?: HorizontalAlignment,
    vAignment?: VerticalAlignment
}

const defaultGameUIProps = {
    hAignment: HorizontalAlignment.Center,
    vAignment: VerticalAlignment.Center
}

export function GameUI(props: GameUIProps) {
    props = {...defaultGameUIProps, ...props}
    const {gl, scene, camera, size} = useThree()
    const virtualCam = useRef<Camera>(null!)
    const virtualScene = useMemo(() => new ThreeScene(), [])
    useFrame(() => {
        gl.autoClear = true
        gl.render(scene, camera)
        gl.autoClear = false
        gl.clearDepth()
        gl.render(virtualScene, virtualCam.current)
    }, 1)

    return createPortal(
        <>
            <OrthographicCamera left={-size.width / 2}
                                right={size.width / 2}
                                top={size.height / 2}
                                bottom={-size.height / 2}
                                near={-1000}
                                far={1000}
                                ref={virtualCam}
                                makeDefault={false}
                                position={[0, 0, 10]}
            />
            <group>
                {props.children}
            </group>
            <ambientLight intensity={0.5}/>
            <pointLight position={[10, 10, 10]} intensity={0.5}/>
        </>,
        virtualScene
    )
}

