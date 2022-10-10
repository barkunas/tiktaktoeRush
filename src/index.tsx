import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import { RootState } from '@react-three/fiber'
import { Scene } from "./components/Scene/Scene";
import { CustomCanvas } from "./components/Canvas/CustomCanvas";

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

reportWebVitals();
