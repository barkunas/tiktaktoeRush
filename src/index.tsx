import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import {
    Canvas,
    useFrame,
    useThree,
    Props,
    RootState
} from '@react-three/fiber'
import json from "./treejs/sceneTemplate.json"
import { ObjectLoader, Object3D, Event as TreeEvent, PerspectiveCamera, Vector3 } from 'three';

const root = document.getElementById('root') as HTMLElement;
const reactRoot = ReactDOM.createRoot(root)

function onCreatedCanvas(state: RootState) {
    const renderer = state.gl;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xccccff);
}

// Render entry point
reactRoot.render(
    <div style={{position: "relative", width: "100%", height: "100%"}}>
        <CustomCanvas onCreated={onCreatedCanvas} dpr={window.devicePixelRatio}>
           <Scene/>
        </CustomCanvas>
    </div>
);

function CustomCanvas(props: Props) {
    const camera2 = new ObjectLoader().parse<PerspectiveCamera>(json.camera);
    return (
        <Canvas gl={{antialias: true}} camera={camera2} {...props}>
            {props.children}
        </Canvas>
    )
}

function Scene() {
    const treeState = useThree();
    console.log(treeState.scene)
    const camera = treeState.camera
    let counting = 0;
    let dist = true;
    useFrame((state) => {
        if (dist) {
            camera.position.x += 0.01
            camera.position.y += 0.01
            camera.rotateX(-0.001)
            counting++
            if (counting === 100) dist = !dist
        } else {
            camera.position.x -= 0.01
            camera.position.y -= 0.01
            camera.rotateX(0.001)
            counting--
            if (counting === 0) dist = !dist
        }
    })
    const scene = new ObjectLoader().parse<Object3D<TreeEvent>>(json.scene);
    return (
        <primitive object={scene}/>
    )
}

reportWebVitals();
