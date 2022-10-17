import { Platforms } from "./Platforms";
import { useFrame, useThree } from "@react-three/fiber";
import { Matrix4, Scene } from "three";
import { useMemo, useRef, useState } from "react";

export function Game() {

    return (
        <Platforms />
    );
}